<template>
  <div class="md:px-4 w-full mt-4">
    <ThePageTitle
      title="Mon Compte"
      sub-title="Gérez vos informations personnelles et vos points de performance"
    />
    <div class="w-full flex flex-col items-center justify-center">
      <div class="tabs mt-8">
        <a
          class="tab tab-lg tab-lifted"
          @click="setSelectedTab(1)"
          :class="selectedTab === 1 ? 'tab-active' : ''"
          >Informations Personnelles</a
        >
        <a
          class="tab tab-lg tab-lifted"
          @click="setSelectedTab(2)"
          :class="selectedTab === 2 ? 'tab-active' : ''"
          >Mes Points</a
        >
      </div>
      <div class="mt-8">
        <div v-if="selectedTab === 1">
          <form @submit.prevent="savePersonalInfo" class="mb-4">
            <div class="mb-4">
              <div class="form-control w-full max-w-xs">
                <label class="label">
                  <span class="label-text">Prénom</span>
                </label>
                <input
                  :placeholder="connectedUser?.firstName"
                  required
                  v-model="user.firstname"
                  type="text"
                  class="input input-bordered w-full max-w-xs"
                />
              </div>
            </div>
            <div class="mb-4">
              <div class="form-control w-full max-w-xs">
                <label class="label">
                  <span class="label-text">Nom</span>
                </label>
                <input
                  :placeholder="connectedUser?.lastName"
                  required
                  v-model="user.lastname"
                  type="text"
                  class="input input-bordered w-full max-w-xs"
                />
              </div>
            </div>
            <div class="mb-4">
              <div class="form-control w-full max-w-xs">
                <label class="label">
                  <span class="label-text">Email</span>
                </label>
                <input
                  :placeholder="connectedUser?.email"
                  required
                  v-model="user.email"
                  type="email"
                  class="input input-bordered w-full max-w-xs"
                />
              </div>
            </div>
            <div class="mb-4">
              <div class="form-control w-full max-w-xs">
                <label class="label">
                  <span class="label-text">Localisation</span>
                </label>
                <input
                  :placeholder="connectedUser?.location"
                  required
                  v-model="user.location"
                  type="text"
                  class="input input-bordered w-full max-w-xs"
                />
              </div>
            </div>

            <button type="submit" class="btn btn-primary">Mettre à jour</button>
          </form>
        </div>

        <div v-if="selectedTab === 2">
          <form @submit.prevent="savePoints" class="mb-4">
            <div
              v-for="(epreuve, index) in user.epreuves"
              :key="index"
              class="mb-4"
            >
              <label class="block mb-2">Championship ID</label>
              <input
                v-model="epreuve.championshipId"
                type="number"
                class="input"
              />
              <label class="block mb-2">Rider Score</label>
              <input v-model="epreuve.riderScore" type="number" class="input" />
            </div>

            <button type="submit" class="btn btn-primary">Mettre à jour</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from "@/stores/auth";
import { mapState, mapActions } from "pinia";

export default defineComponent({
  data() {
    return {
      selectedTab: 1,
      user: {
        firstname: "",
        lastname: "",
        email: "",
        location: "",
        epreuves: [
          {
            championshipId: 1,
            riderScore: 100,
          },
        ],
      },
    };
  },
  computed: {
    ...mapState(useAuthStore, ["connectedUser"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["checkAuth"]),
    savePersonalInfo() {},
    savePoints() {},
    setSelectedTab(index: number) {
      this.selectedTab = index;
    },
  },
  mounted() {
    this.checkAuth();
  },
});
</script>
