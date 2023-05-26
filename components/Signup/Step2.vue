<template>
    <div class="form-control mb-2">
        <label class="label"> Email : </label>
        <input type="email" placeholder="Email*" name="email" v-model="formStep2Data.email" class="input input-bordered w-full text-black" />
    </div>
    <div class="form-control  mb-2">
        <label class="label"> Mot de passe : </label>
        <input type="password" placeholder="Mot de passe*" name="password" v-model="formStep2Data.password" class="input input-bordered w-full text-black" />
    </div>
    <div class="form-control  mb-2">
        <label class="label"> Confirmez votre mot de passe : </label>
        <input type="password" placeholder="Confirmez votre mot de passe*" name="confirmation" v-model="formStep2Data.confirmation" class="input input-bordered w-full text-black" />
    </div>
</template>


<script lang="ts">
    export default defineComponent({
        name: "SignupStep2",
        emits: ["formStep2Data"],
        data(){
            return {
                formStep2Data: {
                    email: '',
                    password: '',
                    confirmation: ''
                }
            }
        },
        methods: {
            getStep2FormData() {
                this.$emit('formStep2Data', this.formStep2Data);
            },
        },
    });
</script>
