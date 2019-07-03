<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTfunctionalitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tfunctionalities', function (Blueprint $table) {
            $table->bigIncrements('id')->comment('Identificador único de registro');
            $table->bigInteger('fk_tsection_groups')->unsigned()->comment('Foreign_key del registro tsection_groups');
            $table->string('functionality', 50)->charset('utf8')->comment('Nombre de la funcionalidad');
            $table->string('link', 100)->nullable()->charset('utf8')->comment('Url de la funcionalidad');
            $table->string('icon', 50)->nullable()->charset('utf8')->comment('Nombre del icono');
            $table->string('order', 5)->charset('utf8')->comment('Indica el orden en la funcionalidad');
            $table->string('description', 150)->nullable()->charset('utf8')->comment('Descripción de la funcionalidad');
            $table->string('guard_name', 50)->charset('utf8')->comment('Nombre de la guardia {web, app}');
            $table->boolean('active', 1)->default('1')->comment('Determina si el registro se encuentra activo. SI=1, NO=0');
            $table->string('created_by', 40)->charset('utf8')->comment('Nombre del usuario que creo el registro ');
            $table->timestamps();
            $table->string('updated_by', 40)->nullable()->charset('utf8')->comment('Nombre del usuario que actualizó el registro ');
            $table->dateTime('updated_at')->nullable()->comment('Fecha de actualización del registro');
            $table->unique('functionality', 'functionality_unique');
            // $table->unique('order', 'orderFun_unique');
            $table->unique(['id', 'fk_tsection_groups']);
            $table->foreign('fk_tsection_groups')->references('id')->on('tsection_groups')->onUpdate('cascade');
            $table->engine = 'InnoDB';
            $table->charste = 'utf8';
            $table->Collation = 'utf8_unicode_ci';
        });
        DB::statement("ALTER TABLE tfunctionalities AUTO_INCREMENT = 1;");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tfunctionalities');
    }
}
