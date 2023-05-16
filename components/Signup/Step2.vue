<template>
    <div class="form-control mb-2">
        <label class="label"> Email : </label>
        <input type="email" placeholder="Email*" name="email" class="input input-bordered w-full text-black" />
    </div>
    <div class="form-control  mb-2">
        <label class="label"> Mot de passe : </label>
        <input type="password" placeholder="Mot de passe*" name="password" class="input input-bordered w-full text-black" />
    </div>
    <div class="form-control  mb-2">
        <label class="label"> Confirmez votre mot de passe : </label>
        <input type="password" placeholder="Confirmez votre mot de passe*" name="confirmation" class="input input-bordered w-full text-black" />
    </div>
</template>


<script lang="ts">
    export default defineComponent({
        name: "SignupStep2"
    });
</script>