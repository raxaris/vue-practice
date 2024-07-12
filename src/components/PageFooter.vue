<template>
  <footer>
    <div class="content">
      <a href="#">Русский</a>
      <a href="#">Поддержка</a>
      <a href="#">FAQ</a>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'page-footer'
}
</script>

<style scoped>
.content {
  margin: 0 auto;
}

footer {
  display: flex;
  background-color: #226F54;
  width: 100%;
  height: 10vh;
  align-items: center;
}

footer a {
  margin: 0 20px;
  color: #ffffff;
  text-decoration: none;
}
</style>
