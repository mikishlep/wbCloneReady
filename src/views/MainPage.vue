<script>
export default {
name: "MainPage"
}
</script>

<template>
  <div class="app-content">
    <div class="app-content-children">
      <div class="app-layout"></div>
    </div>
    <div class="app-content-preview">
      <div class="app-layout-components">
        <div class="help-center-drawer"></div>
        <div class="help-center-absolute-button" style="bottom: 32px;">
          <button class="help-button"></button>
        </div>
      </div>
    </div>
  </div>
  <div class="footer-view"></div>
</template>

<style scoped>
:root {
  --header-height: 60px;
  --footer-height: 0px;
}

.app-content {
  padding-top: var(--header-height);
  background-color: #f7f7fa;
  box-sizing: border-box;
  min-height: calc(100vh - var(--header-height, 0px) - var(--footer-height, 0px));
  position: relative;
  width: 100%;
}
</style>