<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCconfigsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cconfigs', function (Blueprint $table) {
            $table->bigIncrements('id')->comment('Identificador único de registro');
            $table->string('option_name', 100)->charset('utf8')->comment('Nombre de la variable de configuración');
            $table->string('option_tag', 50)->charset('utf8')->comment('Nombre corto con guiones bajos para identificar la opción de configuración');
            $table->string('option_value', 50)->charset('utf8')->comment('Valor de la variable, puede ser una hora hh:mm o un código de color en  hexadecimal');
            $table->string('description',150)->nullable()->charset('utf8')->comment('Descripción de la configuración');           
            $table->boolean('active', 1)->default('1')->comment('Determina si el registro se encuentra activo. SI=1, NO=0');
            $table->string('created_by', 40)->charset('utf8')->comment('Nombre del usuario que creo el registro ');
            $table->timestamps();
            $table->string('updated_by', 40)->nullable()->charset('utf8')->comment('Nombre del usuario que actualizó el registro ');
            $table->dateTime('updated_at')->nullable()->comment('Fecha de actualización del registro');         
            $table->engine = 'InnoDB';
            $table->charste = 'utf8';
            $table->Collation = 'utf8_unicode_ci';
        });
        DB::statement("ALTER TABLE cconfigs AUTO_INCREMENT = 1;");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cconfigs');
    }
}
