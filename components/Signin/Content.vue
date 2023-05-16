<template>
     <div class="flex items-center justify-center bg-base-300 w-1/3">
        <div class="p-8 bg-secondary rounded-md shadow-md w-full">
        <div class="flex flex-col mb-5">
            <h1 class="text-3xl font-bold color text-center">TEAMGOF</h1>
            <h3 class="text-1xl color text-center">Ravis de vous revoir !</h3>
        </div>

        <div class="form-control mb-2">
            <label class="label"> Adresse email* : </label>
            <div class="relative">
                <div class="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-gray-400">
                    <Icon name="fe:mail" />
                </div>
                <input type="email" name="email" placeholder="jeandupont@exemple.fr" class="input input-bordered w-full text-black pl-10">
            </div>
        </div>
        
        <div class="form-control mb-2">
            <label class="label"> Mot de passe* : </label>
            <div class="relative">
                <div class="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-gray-400">
                    <Icon name="fe:lock" />
                </div>
                <input type="password" name="password" placeholder="Entrez votre mot de passe" class="input input-bordered w-full text-black pl-10">
            </div>
        </div>
        
        <div class="flex flex-col">
            <div><NuxtLink class="mb-6 float-right text-sm" to="/forget-password">Mot de passe oublié ?</NuxtLink></div>
            
            <div class="flex justify-center mb-6">
                <button  @click="" class="btn btn-primary justify-center normal-case">Connexion</button>
            </div>
            
            <div class="flex justify-center space-x-2">
                <div>Pas encore de compte ? </div>
                <NuxtLink class="text-primary" to="/sign-up"> Inscription</NuxtLink>
            </div>
        </div>
        
        </div>
     </div>
  </template>