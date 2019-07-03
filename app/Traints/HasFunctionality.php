<?php

namespace HomeMadrid\Traints;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Builder;
use HomeMadrid\Traints\FunctionalityRegister;
use HomeMadrid\Traints\Contracts\Functionalities;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use HomeMadrid\Models\Tables\Tfunctionalities;

trait HasFunctionality
{
    private $functClass;

    public static function bootHasFunctionality()
    {
        static::deleting(function ($model) {
            if (method_exists($model, 'isForceDeleting') && !$model->isForceDeleting()) {
                return;
            }

            $model->functionalities()->detach();
        });
    }

    public function getFunctionalityClass()
    {
        if (!isset($this->functClass)) {
            $this->functClass =  app(FunctionalityRegister::class)->getFunctionalityClass();
        }

        return $this->functClass;
    }


    /**
     * Función que regresa el objeto de la relación multiple con la tabla roles
     *
     * @return Object
     */
    public function functionalities():  BelongsToMany
    {
         return $this->belongsToMany(
             Tfunctionalities::class,
            'tfunctionality_role',
            'role_id',
            'tfunctionalities_id'
        );
    }


    /**
     * Scope the model query to certain roles only.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string|array|\HomeMadrid\Traints\Contracts\Functionalities|\Illuminate\Support\Collection $functionaliries
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopefunctionality(Builder $query, $functionalities, $guard = null): Builder
    {
        if ($functionalities instanceof Collection) {
            $functionalities = $functionalities->all();
        }

        if (!is_array($functionalities)) {
            $functionalities = [$functionalities];
        }

        $functionalities = array_map(function ($func) use ($guard) {
            if ($func instanceof Functionalities) {
                return $func;
            }

            $method = is_numeric($func) ? 'findById' : 'findByName';
            // $guard = $guard ?: $this->getDefaultGuardNameFunct();

            return $this->getFunctionalityClass()->{$method}($func, $guard);
        }, $functionalities);

        return $query->whereHas('tfunctionalities', function ($query) use ($functionalities) {
            $query->where(function ($query) use ($functionalities) {
                foreach ($functionalities as $func) {
                    $query->orWhere('tfunctionalities' . '.id', $func->id);
                }
            });
        });
    }

    /**
     * Assign the given functionality to the model.
     *
     * @param array|string|HomeMadrid\Traints\Contracts\Functionalities ...$functionalities
     *
     * @return $this
     */
    public function assignfunctionality(...$functionalities)
    {
        $functionalities = collect($functionalities)
            ->flatten()
            ->map(function ($functionality) {
                if (empty($functionality)) {
                    return false;
                }

                return $this->getStoredfunctionality($functionality);
            })
            ->filter(function ($functionality) {
                return $functionality instanceof Functionalities;
            })
            ->map->id
            ->all();

        $model = $this->getModel();

        if ($model->exists) {
            $this->functionalities()->sync($functionalities, false);
            $model->load('functionalities');
        } else {
            $class = \get_class($model);

            $class::saved(
                function ($object) use ($functionalities, $model) {
                    static $modelLastFiredOn;
                    if ($modelLastFiredOn !== null && $modelLastFiredOn === $model) {
                        return;
                    }
                    $object->functionalities()->sync($functionalities, false);
                    $object->load('functionalities');
                    $modelLastFiredOn = $object;
                }
            );
        }
        // $this->forgetCachedPermissions();
        return $this;
    }


    public function getFunctionalityNames(): Collection
    {
        // return $this->functionalities->pluck('name');
        $filtered = $this->functionalities->map(function ($item, $key) {
            if ($item->active == 1) {
                return $item;
            }
        });
        return  $filtered->pluck('functionality');
    }


    protected function getStoredfunctionality($functionalities): Functionalities
    {
        $functClass = $this->getFunctionalityClass();

        if (is_numeric($functionalities)) {
            return $functClass::findById($functionalities);
        }

        if (is_string($functionalities)) {
            return $functClass::findByName($functionalities);
        }

        return $functionalities;
    }

}
