
<template>
    <div>
        <div class="input">
            <h3>Set Description</h3>
            <el-input
                v-model="plainDesc"
                type="textarea"
                :rows="10"
                placeholder="Please enter your app description"
                autofocus
            />
            <el-button :disabled="words.length !== 0" @click="saveInput">
                <font-awesome-icon :icon="['fas', 'paper-plane']"/> Send Description
            </el-button>
            <p v-if="words.length !== 0">
                Description sent
            </p>
        </div>
        <div class="update">
            <h3>Filter Words</h3>
            <el-input v-model.trim="filterWords" type="text"/>
            <p>Please enter words buy putting , between words.</p>
            <el-button :disabled="isClickable" @click="createKeywords">
                Update/Filter
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

        <div class="gram">
            <div v-for="gramName in grams" :key="gramName">
                <h4 v-if="words.length !== 0">
                    {{ gramName }}
                </h4>
                <div v-if="filterArr.length !== 0">
                    <el-tag v-for="(word, index) in keywords[gramName]" :key="index" class="tag">
                        {{ word }}
                    </el-tag>
                </div>
                <div v-else/>
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
                isDisabled: true,
            };
        },
        computed: {
            isClickable(){
                return this.isDisabled || this.words.length === 0;
            },

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


                for (let k = 1; k <= 10; k++) {
                    this.keywords[k] = new Set();

                    for (let i = 0; i < this.words.length; i++) {
                        let keyword = '';

                        for (let j = 0; j<k; j++){
                            if (i + j <= this.words.length - 1) {
                                keyword += this.words[i + j] + ' ';
                            }
                        }
                        let checkArr = keyword.split(' ');
                        if (checkArr.length > k) {
                            this.keywords[k].add(keyword);
                        }

                        keyword = '';
                    }
                }

            },
            saveInput(){
                const regex = /[!•"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
                this.plainDesc = this.plainDesc.replace(regex, '');
                this.createKeywords();
            },
        },
        beforeUpdate(){
            this.grams.sort((a,b) => {
                return a-b;
            });
        },
        watch: {
            plainDesc(){
                this.isDisabled = false;
            },
            filterWords(){
                this.isDisabled = false;
            },
            words(){
                this.isDisabled = true;
            },
        },

    };
</script>

<style>
.input,
.update {
  text-align: center;
  margin: 20px 20px;
}
.gram {
  width: 100vw;
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
