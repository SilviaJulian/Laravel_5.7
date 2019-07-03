<?php

namespace HomeMadrid\Models\Tables;

use HomeMadrid\Traints\Guard;
use Illuminate\Support\Collection;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Model;

use HomeMadrid\Traints\FunctionalityRegister;
use Spatie\Permission\Traits\RefreshesPermissionCache;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Spatie\Permission\Exceptions\PermissionDoesNotExist;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use HomeMadrid\Traints\Contracts\Functionalities as FunctionalitiesContract;
use HomeMadrid\Models\Tables\Tsection_group;
use Spatie\Permission\Models\Role;

use Spatie\Permission\Exceptions\RoleDoesNotExist;
use Spatie\Permission\Exceptions\GuardDoesNotMatch;
use Spatie\Permission\Exceptions\RoleAlreadyExists;

class Tfunctionalities extends Model implements FunctionalitiesContract
{

    use HasRoles;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'tfunctionalities';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';


    protected $guarded = ['id'];

    public function __construct(array $attributes = [])
    {
        $attributes['guard_name'] = $attributes['guard_name'] ?? config('auth.defaults.guard');

        parent::__construct($attributes);

        $this->setTable(config($this->table));
    }


    public static function create(array $attributes = [])
    {
        $attributes['guard_name'] = $attributes['guard_name'] ?? Guard::getDefaultName(static::class);

        // $functionalities = static::where('functionality', $attributes['functionality'])->where('active', 1)->first();
         $functionalities = static::getFunctionalities(['functionality' => $attributes['functionality'], 'guard_name' => $attributes['guard_name']])->first();

        if ($functionalities) {
            throw PermissionAlreadyExists::create($attributes['functionality'], $attributes['guard_name']);
        }

        if (isNotLumen() && app()::VERSION < '5.4') {
            return parent::create($attributes);
        }

        return static::query()->create($attributes);
    }


    /**
     * Función que regresa el objeto de la sección a la que pertence.
     *
     * @return Object
     */
    public function section()
    {
        return $this->belongsTo(Tsection_group::class, 'fk_tsection_groups');
    }

    /**
     * Función que regresa el objeto de la relación multiple con la tabla roles
     *
     * @return Object
     */
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(
            Role::class,
            // config('permission.models.role'),
            'tfunctionality_role',
            'tfunctionalities_id',
            'role_id'
        );
    }

    /**
     * Find a role by its name and guard name.
     *
     * @param string $name
     * @param string|null $guardName
     *
     * @return HomeMadrid\Traints\Contracts\Functionalities|\ HomeMadrid\Traints\\Models\Tfunctionalities
     *
     * @throws \Spatie\Permission\Exceptions\RoleDoesNotExist
     */
    public static function findByName(string $name, $guardName = null): FunctionalitiesContract
    {
        $guardName = $guardName ?? Guard::getDefaultName(static::class);

        // $functionalities = static::where('functionality', $name)->where('guard_name', $guardName)->where('active', 1)->first();
        $functionalities = static::getFunctionalities(['functionality' => $name, 'guard_name' => $guardName, 'active' => 1])->first();

        if (!$functionalities) {
            throw PermissionDoesNotExist::create($name, $guardName);
        }

        return $functionalities;
    }

    public static function findById(int $id, $guardName = null): FunctionalitiesContract
    {
        $guardName = $guardName ?? Guard::getDefaultName(static::class);

        // $functionalities = static::where('id', $id)->where('guard_name', $guardName)->where('active', 1)->first();
        $functionalities = static::getFunctionalities(['id' => $id, 'guard_name' => $guardName, 'active' => 1])->first();


        if (!$functionalities) {
            throw PermissionDoesNotExist::withId($id, $guardName);
        }

        return $functionalities;
    }

    /**
     * Find or create role by its name (and optionally guardName).
     *
     * @param string $name
     * @param string|null $guardName
     *
     * @return \HomeMadrid\Traints\Contracts\Functionalities
     */
    public static function findOrCreate(string $name, $guardName = null): FunctionalitiesContract
    {
        $guardName = $guardName ?? Guard::getDefaultName(static::class);

        $functionalities = static::where('functionality', $name)->where('guard_name', $guardName)->first();
        // $functionalities = static::getFunctionalities(['functionality' => $name, 'guard_name' => $guardName, 'active' => 1])->first();


        if (!$functionalities) {
            return static::query()->create(['name' => $name, 'guard_name' => $guardName]);
        }

        return $functionalities;
    }

    /**
     * Get the current cached permissions.
     */
    protected static function getFunctionalities(array $params = []): Collection
    {
        return app(FunctionalityRegister::class)->getFunctionalities($params);
    }
}
