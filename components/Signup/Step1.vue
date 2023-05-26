<<<<<<< HEAD
<script lang="ts">
export default defineComponent({
  name: 'SignupStep1',
})
</script>

<template>
  <div class="form-control mb-2">
    <label class="label"> Nom : </label>
    <input type="text" placeholder="Nom*" name="lastname" class="input input-bordered w-full text-black">
  </div>
  <div class="form-control  mb-2">
    <label class="label"> Prénom : </label>
    <input type="text" placeholder="Prénom*" name="firstname" class="input input-bordered w-full text-black">
  </div>
  <div class="form-control  mb-2">
    <label class="label"> Localisation : </label>
    <input type="text" placeholder="Localisation*" name="localisation" class="input input-bordered w-full text-black">
  </div>
</template>
=======
<template>
    <div class="form-control mb-2">
        <label class="label"> Nom : </label>
        <input type="text" placeholder="Nom*" name="lastname" v-model="formStep1Data.lastname" class="input input-bordered w-full text-black" />
    </div>
    <div class="form-control  mb-2">
        <label class="label"> Prénom : </label>
        <input type="text" placeholder="Prénom*" name="firstname" v-model="formStep1Data.firstname" class="input input-bordered w-full text-black" />
    </div>
    <div class="form-control  mb-2">
        <label class="label"> Localisation : </label>
        <input type="text" placeholder="Localisation*" name="localisation" v-model="formStep1Data.localisation" class="input input-bordered w-full text-black" />
    </div>
</template>

<script lang="ts">
    export default defineComponent({
        name: "SignupStep1",
        emits: ["formStep1Data"],
        data(){
            return {
                formStep1Data: {
                    lastname: '',
                    firstname: '',
                    localisation: ''
                }
            }
        },
        methods: {
            getStep1FormData() {
                this.$emit('formStep1Data', this.formStep1Data);
            },
        },
    });
</script>
>>>>>>> cd4e6ee175a5977f6f3cf2672e08e140932c5a3b
