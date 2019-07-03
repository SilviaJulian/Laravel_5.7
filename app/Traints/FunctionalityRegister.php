<?php

namespace HomeMadrid\Traints;

use Illuminate\Cache\CacheManager;
use Illuminate\Support\Collection;
use Spatie\Permission\Contracts\Role;
use Illuminate\Contracts\Auth\Access\Gate;
use Illuminate\Contracts\Auth\Access\Authorizable;
use Spatie\Permission\Exceptions\PermissionDoesNotExist;

use  HomeMadrid\Models\Tables\Tfunctionalities;
use HomeMadrid\Traints\Contracts\Functionalities;

class FunctionalityRegister
{
    /** @var \Illuminate\Contracts\Auth\Access\Gate */
    protected $gate;

    /** @var \Illuminate\Contracts\Cache\Repository */
    protected $cache;

    /** @var \Illuminate\Cache\CacheManager */
    protected $cacheManager;

    /** @var string */
    protected $functionalityClass;

    /** @var string */
    protected $roleClass;

    /** @var \Illuminate\Support\Collection */
    protected $functionality;

    /** @var DateInterval|int */
    public static $cacheExpirationTime;

    /** @var string */
    public static $cacheKey;

    /** @var string */
    public static $cacheModelKey;

    /**
     * PermissionRegistrar constructor.
     *
     * @param \Illuminate\Contracts\Auth\Access\Gate $gate
     * @param \Illuminate\Cache\CacheManager $cacheManager
     */
    public function __construct(Gate $gate, CacheManager $cacheManager)
    {
        $this->gate = $gate;
        $this->functionalityClass = Tfunctionalities::class;
        $this->roleClass = Role::class;

        $this->cacheManager = $cacheManager;
        $this->initializeCache();
    }

    protected function initializeCache()
    {
        self::$cacheExpirationTime = config('permission.cache.expiration_time', config('permission.cache_expiration_time'));

        if (app()->version() <= '5.5') {
            if (self::$cacheExpirationTime instanceof \DateInterval) {
                $interval = self::$cacheExpirationTime;
                self::$cacheExpirationTime = $interval->m * 30 * 60 * 24 + $interval->d * 60 * 24 + $interval->h * 60 + $interval->i;
            }
        }

        self::$cacheKey = config('permission.cache.key');
        self::$cacheModelKey = config('permission.cache.model_key');

        $this->cache = $this->getCacheStoreFromConfig();
    }

    protected function getCacheStoreFromConfig(): \Illuminate\Contracts\Cache\Repository
    {
        // the 'default' fallback here is from the permission.php config file, where 'default' means to use config(cache.default)
        $cacheDriver = config('permission.cache.store', 'default');

        // when 'default' is specified, no action is required since we already have the default instance
        if ($cacheDriver === 'default') {
            return $this->cacheManager->store();
        }

        // if an undefined cache store is specified, fallback to 'array' which is Laravel's closest equiv to 'none'
        if (! \array_key_exists($cacheDriver, config('cache.stores'))) {
            $cacheDriver = 'array';
        }

        return $this->cacheManager->store($cacheDriver);
    }

    /**
     * Register the permission check method on the gate.
     *
     * @return bool
     */
    public function registerFunctionalities(): bool
    {
        $this->gate->before(function (Authorizable $user, string $ability) {
            try {
                if (method_exists($user, 'hasFunctionalityTo')) {
                    return $user->hasFunctionalityTo($ability) ?: null;
                }
            } catch (PermissionDoesNotExist $e) {
            }
        });

        return true;
    }

    /**
     * Flush the cache.
     */
    public function forgetCachedFunctionality()
    {
        $this->functionality = null;
        $this->cache->forget(self::$cacheKey);
    }

    /**
     * Get the Functionalities based on the passed params.
     *
     * @param array $params
     *
     * @return \Illuminate\Support\Collection
     */
    public function getFunctionalities(array $params = []): Collection
    {
        if ($this->functionality === null) {
            $this->functionality = $this->cache->remember(self::$cacheKey, self::$cacheExpirationTime, function () {
                return $this->getFunctionalityClass()
                    ->with('roles')
                    ->get();
            });
        }

        $functionality = clone $this->functionality;

        foreach ($params as $attr => $value) {
            $functionality = $functionality->where($attr, $value);
        }

        return $functionality;
    }

    /**
     * Get an instance of the Functionalities class.
     *
     * @return \Spatie\Permission\Contracts\Functionalities
     */
    public function getFunctionalityClass(): Functionalities
    {
        return app($this->functionalityClass);
        // return $this->functionalityClass;
    }

    /**
     * Get an instance of the role class.
     *
     * @return \Spatie\Permission\Contracts\Role
     */
    public function getRoleClass(): Role
    {
        return app($this->roleClass);
    }

    /**
     * Get the instance of the Cache Store.
     *
     * @return \Illuminate\Contracts\Cache\Store
     */
    public function getCacheStore(): \Illuminate\Contracts\Cache\Store
    {
        return $this->cache->getStore();
    }
}
