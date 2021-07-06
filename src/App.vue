<template>
    <div>
        <the-header/>
        <div class="w-screen sm:flex sm:justify-around">
            <div>
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

    };
</script>

<style>
html, body{
  margin: 0;
  padding: 0;
}
</style>
