<template>
  <div id="app">
    <div id="nav">
      <router-view/>
    </div>
    <div id="content">
      <router-view/>
    </div>
  </div>
</template>

<style>
#nav{
  float: left;
}
#content{
  float: left;
}
</style>
