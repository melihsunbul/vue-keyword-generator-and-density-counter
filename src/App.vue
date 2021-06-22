<template>
    <div>
        <div id="input">
            <h3>Set Description</h3>
            <input ref="getInput" type="text">
            <button @click="getInput">
                Send
            </button>
        </div>
        <div id="gram">
            <div>
                <h4>1-gram</h4>
                <li v-for="word in firstGram" :key="word">
                    {{ word }}
                </li>
            </div>
            <div>
                <h4>2-gram</h4>
                <li v-for="word in secondGram" :key="word">
                    {{ word }}
                </li>
            </div>
            <div>
                <h4>3-gram</h4>
                <li v-for="word in thirdGram" :key="word">
                    {{ word }}
                </li>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'app',
        data(){
            return {
                plainDesc: '',
                firstGram: [],
                secondGram: [],
                thirdGram: [],
            };
        },
        methods: {
            createKeywords(){
                this.firstGram = this.plainDesc.split(' ');
                this.firstGram = this.firstGram.map(word => word.toLowerCase());
                for (let i = 0; i<this.firstGram.length; i++){
                    let twoWords = '';
                    let threeWords = '';
                    if (i + 1 <= this.firstGram.length -1) {
                        twoWords = this.firstGram[i] + ' ' + this.firstGram[i+1];
                    }
                    if (i + 1 <= this.firstGram.length -1 && i + 2 <= this.firstGram.length -1) {
                        threeWords = this.firstGram[i] + ' ' + this.firstGram[i+1] + ' ' + this.firstGram[i+2];
                    }
                    this.secondGram.push(twoWords);
                    this.thirdGram.push(threeWords);

                }
                this.removeDuplicates(this.firstGram);
                this.removeDuplicates(this.secondGram);
                this.removeDuplicates(this.thirdGram);

            },
            getInput(){
                const regex = /[!•"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
                this.plainDesc = this.$refs.getInput.value.replace(regex, '');
                this.createKeywords();
            },
            removeDuplicates(arr){
                return [...new Set(arr)];
            },
        },
    };
</script>

<style>
#input {
text-align: center
}
#gram {
  display: flex;
  justify-content: space-around;
}
li {
  list-style-type:none;

}
</style>
