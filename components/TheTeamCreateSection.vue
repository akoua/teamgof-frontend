<template>
    <div class="team">
      <div class="team-image">
        <img :src="imagePath" :alt="title" />
      </div>
      <div class="team-info">
        <h2 class="team-title">{{ title }}</h2>
        <p class="team-description">{{ description }}</p>
        <p class="team-level">{{ level }}</p>
        <p class="team-location">{{ location }}</p>
        <div class="team-championship">
          <label for="championship-id">Championship:</label>
          <select id="championship-id" v-model="championshipId">
            <option v-for="championship in championships" :key="championship.id" :value="championship.id">{{ championship.name }}</option>
          </select>
        </div>
        <p class="team-sport">{{ sport }}</p>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    props: {
      title: {
        type: String,
        required: true
      },
      imagePath: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      level: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required: true
      },
      championshipId: {
        type: Number,
        required: true
      },
      sport: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        championships: [
          { id: 1, name: 'GOF' },
          { id: 2, name: 'CSO' },
          { id: 3, name: 'Equifun' },
        ]
      }
    },
    setup () {
           return {}
    }
})
</script>

<style scoped>
.team {
  display: flex;
  flex-wrap: wrap;
  margin: 2rem 0;
}

.team-image {
  flex: 0 0 50%;
  margin-right: 2rem;
}

.team-image img {
  max-width: 100%;
}

.team-info {
  flex: 0 0 calc(50% - 2rem);
}

.team-title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.team-level {
  margin-bottom: 0.5rem;
}

.team-championship {
  margin-bottom: 0.5rem;
}

.team-championship select {
  margin-left: 0.5rem;
}
</style>