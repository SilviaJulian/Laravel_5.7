<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tusers', function (Blueprint $table) {
            $table->bigIncrements('id')->comment('Identificador único de registro');
            $table->bigInteger('fk_tpeoples')->unsigned()->comment('Foreign_key del registro tpeoples');
            $table->string('name_user', 40)->charset('utf8')->comment('Nombre de usuario');
            $table->longText('img_user')->nullable()->comment('Imagen de perfil del usuario en base64');
            $table->string('email', 80)->charset('utf8')->comment('Dirección de correo del usuario');
            $table->timestamp('email_verified_at')->nullable()->comment('Fecha de cuando se verifica del correo');
            $table->string('email_alter', 80)->nullable()->charset('utf8')->comment('Dirección de correo alternativo del usuario');
            $table->text('password')->comment('Contraseña cifrada');
            $table->rememberToken()->comment('Token creado al inicar sesión');
            $table->boolean('active', 1)->default('1')->comment('Determina si el registro se encuentra activo. SI=1, NO=0');
            $table->string('created_by', 40)->charset('utf8')->comment('Nombre del usuario que creo el registro ');
            $table->timestamps();
            $table->string('updated_by', 40)->nullable()->charset('utf8')->comment('Nombre del usuario que actualizó el registro ');
            $table->dateTime('updated_at')->nullable()->comment('Fecha de actualización del registro');
            $table->unique('name_user', 'name_user_unique');
            $table->unique('email', 'email_unique');
            $table->unique('email_alter', 'email_alter_unique');
            $table->foreign('fk_tpeoples')->references('id')->on('tpeoples')->onUpdate('cascade');
            $table->engine = 'InnoDB';
            $table->charste = 'utf8';
            $table->Collation = 'utf8_unicode_ci';
        });
        DB::statement("ALTER TABLE tusers AUTO_INCREMENT = 1;");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tusers');
    }
}
