<template>
  <div class="tabs">
    <div class="tab-list w-full">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{ 'active': activeTab === index }"
        @click="changeTab(index)"
      >
        {{ tab.title }}
      </button>
    </div>
    <div class="tab-content">
      <slot :name="tabs[activeTab].name"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 0,
      tabs: [
        { title: 'Equipes éligibles', name: 'tab1' },
        { title: 'Equipes conditionnelles envisageables pour intégration', name: 'tab2' },
      ],
    };
  },
  methods: {
    changeTab(index) {
      this.activeTab = index;
    },
  },
};
</script>

<style scoped>
.tabs {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 16px;
}

.tab-list {
  display: flex;
}

.tab-list button {
  padding: 8px 16px;
  background-color: #f0f0f0;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  margin-right: 0px;
  font-size: 16px;
  color: #333;
  width: 100%;
}

.tab-list button.active {
  border-bottom-color: #D11A2A;
  font-weight: bold;
  color: white;
  background-color: #2D2D2D;
}

.tab-content {
  margin-top: 24px;
  width: 100%;
}
</style>
