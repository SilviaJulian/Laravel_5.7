<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTPeoplesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tpeoples', function (Blueprint $table) {
            $table->bigIncrements('id')->comment('Identificador único de registro');
            $table->string('name', 80)->charset('utf8')->comment('Nombre(s) de la persona');
            $table->string('last_name', 100)->charset('utf8')->comment('Apellidos de la persona');
            $table->enum('gender', ['Masc','Fem'])->charset('utf8')->comment('Sexo de la persona');
            $table->date('date_birth')->nullable()->comment('Fecha de nacimiento de la persona');
            $table->boolean('active', 1)->default('1')->comment('Determina si el registro se encuentra activo. SI=1, NO=0');
            $table->string('created_by', 40)->charset('utf8')->comment('Nombre del usuario que creo el registro ');
            $table->timestamps();
            $table->string('updated_by', 40)->nullable()->charset('utf8')->comment('Nombre del usuario que actualizó el registro ');
            $table->dateTime('updated_at')->nullable()->comment('Fecha de actualización del registro');
            $table->engine = 'InnoDB';
            $table->charste = 'utf8';
            $table->Collation = 'utf8_unicode_ci';
        });
        DB::statement("ALTER TABLE tpeoples AUTO_INCREMENT = 1;");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tpeoples');
    }
}
