<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTfunctionalityRoleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tfunctionality_role', function (Blueprint $table) {
            $table->bigIncrements('id')->comment('Identificador único de registro');
            $table->bigInteger('role_id')->unsigned()->comment('Foreign_key del registro roles');
            $table->bigInteger('tfunctionalities_id')->unsigned()->comment('Foreign_key del registro tfunctionalities');
            $table->boolean('active', 1)->default('1')->comment('Determina si el registro se encuentra activo. SI=1, NO=0');
            $table->string('created_by', 40)->nullable()->charset('utf8')->comment('Nombre del usuario que creo el registro ');
            $table->timestamps();
            $table->string('updated_by', 40)->nullable()->charset('utf8')->comment('Nombre del usuario que actualizó el registro ');
            $table->dateTime('updated_at')->nullable()->comment('Fecha de actualización del registro');
            $table->unique(['role_id', 'tfunctionalities_id'], 'tfunctRol_unique');
            $table->foreign('role_id')->references('id')->on('roles')->onUpdate('cascade');
            $table->foreign('tfunctionalities_id')->references('id')->on('tfunctionalities')->onUpdate('cascade');
            $table->engine = 'InnoDB';
            $table->charste = 'utf8';
            $table->Collation = 'utf8_unicode_ci';
        });
        DB::statement("ALTER TABLE tfunctionality_role AUTO_INCREMENT = 1;");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tfunctionality_role');
    }
}
