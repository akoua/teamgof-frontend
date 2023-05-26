<<<<<<< HEAD
=======
<template>
    <div class="flex items-center  mb-8">
        <span class="font-bold mr-3">Ajouter vos différentes qualifications</span>
        <a class="btn btn-primary p-2" @click="addRow">
            <Icon name="fe:plus" size="24" class="text-white" />
        </a>
    </div>
  
    <div class="tab-container">
      <div v-for="(row, index) in rows" :key="index" class="tab flex flex-col mb-12">
        <div class="flex">
         
                <div class="mr-4">
                    <select name="row.input1" class="select select-bordered w-full max-w-xs">
                        <option disabled selected>Discipline ?</option>
                        <option>D1</option>
                        <option>D2</option>
                    </select> 
                </div>
                <div class="mr-4">
                    <select name="row.input2" class="select select-bordered w-full max-w-xs">
                        <option disabled selected>Niveau ?</option>
                        <option>N1</option>
                        <option>N2</option>
                    </select> 
                </div>
                <div class="mr-4">
                    <select name="row.input3" class="select select-bordered w-full max-w-xs">
                        <option disabled selected>Qualification ?</option>
                        <option>Q1</option>
                        <option>Q2</option>
                    </select> 
                </div>
                <div>
                    <a class="btn btn-base-300 btn-circle" @click="deleteRow(index)">
                        <Icon name="fe:close" size="22" />
                    </a>
                </div>
            </div>
      </div>
    </div>
</template>

>>>>>>> cd4e6ee175a5977f6f3cf2672e08e140932c5a3b
<script>
export default {
  name: 'SignupStep3',
  data() {
    return {
      /* For form components generate dynamically */
      rows: [],
    }
  },
  methods: {
    addRow() {
      this.rows.push({ input1: '', input2: '', input3: '' })
    },
    deleteRow(index) {
      this.rows.splice(index, 1)
    },
  },
}
</script>

<template>
  <div class="flex items-center  mb-8">
    <span class="font-bold mr-3">Ajouter vos différentes qualifications</span>
    <a class="btn btn-primary p-2" @click="addRow">
      <Icon name="fe:plus" size="24" class="text-white" />
    </a>
  </div>

  <div class="tab-container">
    <div v-for="(row, index) in rows" :key="index" class="tab flex flex-col mb-12">
      <div class="flex">
        <div class="mr-4">
          <select name="row.input1" class="select select-bordered w-full max-w-xs">
            <option disabled selected>
              Discipline ?
            </option>
            <option>D1</option>
            <option>D2</option>
          </select>
        </div>
        <div class="mr-4">
          <select name="row.input2" class="select select-bordered w-full max-w-xs">
            <option disabled selected>
              Niveau ?
            </option>
            <option>N1</option>
            <option>N2</option>
          </select>
        </div>
        <div class="mr-4">
          <select name="row.input3" class="select select-bordered w-full max-w-xs">
            <option disabled selected>
              Qualification ?
            </option>
            <option>Q1</option>
            <option>Q2</option>
          </select>
        </div>
        <div>
          <a class="btn btn-base-300 btn-circle" @click="deleteRow(index)">
            <Icon name="fe:close" size="22" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
