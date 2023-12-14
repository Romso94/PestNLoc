<template>
  <div class="admin-pannel">
    <a href="/admin/cars" class="button-pannel-admin">Cars</a>
    <a href="/admin/agencies"  class="button-pannel-admin">Agencies</a>
    <a href="/admin/contracts"  class="button-pannel-admin">Contracts</a>
    <a href="/admin/clients" class="button-pannel-admin">Clients</a>
  </div>
</template>

<script>
export default {
  name: "AdminPannelComponent"
}
</script>

<style scoped>

.admin-pannel{
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 30px;
}

.button-pannel-admin{
  color: #F5F7F8;
  background-color: #333333;
  border-radius: 5px;
  padding: 15px;
  font-weight: bold;
  font-size: 22px;

  text-decoration: none;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-pannel-admin:hover{
  color: #F4CE14;
}

</style>