<template>
    <div>
        <the-header/>
        <div class="w-screen sm:flex sm:justify-around">
            <router-view/>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'app',
    };
</script>

<style>
html, body{
  margin: 0;
  padding: 0;
}
</style>
