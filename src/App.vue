
<template>
    <div>
        <div id="input">
            <h3>Set Description</h3>
            <el-input
                v-model="plainDesc"
                type="textarea"
                :rows="2"
                placeholder="Please input"
                autofocus
            />
            <el-button @click="getInput">
                <font-awesome-icon :icon="['fas', 'user-secret']"/>Send
            </el-button>
            <p v-if="words.length !== 0">
                Description sent
            </p>
        </div>
        <div id="filterWords">
            <h3>Filter Words</h3>
            <el-input v-model.trim="filterWords" type="text"/>
            <p>Please enter words buy putting , between words.</p>
            <el-button @click="createKeywords">
                Filter
            </el-button>
        </div>
        <div>
            <el-checkbox-group v-model="grams">
                <el-checkbox
                    v-for="i in 10" :key="i + '-gram'"
                    :label="i"
                >
                    {{ i }}-gram
                </el-checkbox>
            </el-checkbox-group>
        </div>

        <div id="gram">
            <div v-for="gramName in grams" :key="gramName">
                <h4 v-if="words.length !== 0">
                    {{ gramName }}
                </h4>
                <el-tag v-for="(word, index) in keywords[gramName]" :key="index" class="tag">
                    {{ word }}
                </el-tag>
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
                filterWords: '',
                filterArr: [],
                grams: [],
                keywords: [],
                words: [],
            };
        },
        methods: {
            createKeywords() {
                this.filterArr = this.filterWords.split(',');
                this.filterArr = this.filterArr.map(word => word.toLowerCase());
                this.words = [];
                this.keywords = [];

                this.words = this.plainDesc.split(' ');
                this.words = this.words.map(word => word.toLowerCase().trim());
                this.words = this.words.filter(word => !this.filterArr.includes(word));

                for (let k = 0; k < this.grams.length; k++) {
                    this.keywords[this.grams[k]] = [];
                    for (let i = 0; i < this.words.length; i++) {
                        let keyword = '';

                        for (let j = 0; j<this.grams[k]; j++){
                            if (i + j <= this.words.length - 1) {
                                keyword += this.words[i + j] + ' ';
                            }
                        }
                        let checkArr = keyword.split(' ');
                        if (checkArr.length > this.grams[k]) {
                            this.keywords[this.grams[k]].push(keyword);
                        }
                        keyword = '';
                    }
                }
                this.keywords.forEach((keyArr, index) => this.keywords[index] = this.removeDuplicates(keyArr));

            },
            getInput(){
                const regex = /[!•"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
                this.plainDesc = this.plainDesc.replace(regex, '');
                this.createKeywords();
            },
            removeDuplicates(arr){
                return [...new Set(arr)];
            },
        },
        watch: {
            grams(){
                if (this.words.length !== 0) {
                    this.createKeywords();
                }
                console.log(this.grams);
            },
        },

    };
</script>

<style>
#input,
#filterWords {
text-align: center;
margin: 20px 20px;
}
#gram {
  width: 90vw;
  overflow: scroll;
  display: flex;
  justify-content: space-around;
}
li {
  list-style-type:none;

}
.tag {
  margin: 5px 5px ;
}
</style>
