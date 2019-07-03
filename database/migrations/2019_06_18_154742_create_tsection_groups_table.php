<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTsectionGroupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tsection_groups', function (Blueprint $table) {
            $table->bigIncrements('id')->comment('Identificador único de registro');
            $table->bigInteger('fk_cgroups')->unsigned()->comment('Foreign_key del registro cgroups');
            $table->string('section', 50)->charset('utf8')->comment('Nombre de la sección');
            $table->string('order', 5)->charset('utf8')->comment('Indica el orden en la sección');
            $table->string('icon', 50)->nullable()->charset('utf8')->comment('Nombre del icono');
            $table->string('description',150)->nullable()->charset('utf8')->comment('Descripción de la sección');
            $table->boolean('active', 1)->default('1')->comment('Determina si el registro se encuentra activo. SI=1, NO=0');
            $table->string('created_by', 40)->charset('utf8')->comment('Nombre del usuario que creo el registro ');
            $table->timestamps();
            $table->string('updated_by', 40)->nullable()->charset('utf8')->comment('Nombre del usuario que actualizó el registro ');
            $table->dateTime('updated_at')->nullable()->comment('Fecha de actualización del registro');
            $table->unique('section', 'section_unique');
            $table->unique(['id','fk_cgroups']);
            $table->foreign('fk_cgroups')->references('id')->on('cgroups')->onUpdate('cascade');
            $table->engine = 'InnoDB';
            $table->charste = 'utf8';
            $table->Collation = 'utf8_unicode_ci';
        });
        DB::statement("ALTER TABLE tsection_groups AUTO_INCREMENT = 1;");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tsection_groups');
    }
}
