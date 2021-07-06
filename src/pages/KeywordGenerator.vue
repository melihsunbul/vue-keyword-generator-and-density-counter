<template>
    <div>
        <div class="text-center mx-20 my-20">
            <h1>
                Set Description
            </h1>
            <el-input
                v-model="plainDesc"
                type="textarea"
                :rows="10"
                placeholder="Please enter your app description"
                autofocus
            />
            <el-button :disabled="isDescChanged" class="mt-10" @click="saveInput">
                <font-awesome-icon :icon="['fas', 'paper-plane']"/>
                Send Description
            </el-button>
            <p v-if="words.length !== 0">
                Description sent
            </p>
        </div>
        <div class="text-center mx-20 my-20">
            <h3>Filter Words</h3>
            <el-input v-model.trim="filterWords" type="text"/>
            <p>Please enter words buy putting , between words.</p>
            <el-button :disabled="isClickable" @click="createKeywords">
                Update/Filter
            </el-button>
        </div>
        <div>
            <el-checkbox-group v-model="grams" class="text-center">
                <el-checkbox
                    v-for="i in 10" :key="i + '-gram'"
                    :label="i"
                >
                    {{ i }}-gram
                </el-checkbox>
            </el-checkbox-group>
        </div>
        <div class="w-screen flex overflow-scroll justify-around">
            <div v-for="gramName in sortedGrams" :key="gramName">
                <h4 v-if="words.length !== 0">
                    {{ gramName }}
                </h4>
                <div>
                    <el-tag v-for="(word, index) in keywords[gramName]" :key="index" class="mx-1 my-1">
                        {{ word }}
                    </el-tag>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import { cleanDescription } from '../utils/CleanDescription';
    export default {
        data() {
            return {
                plainDesc: '',
                keywords: [],
                words: [],
                filterWords: '',
                filterArr: [],
                grams: [],
                isDisabled: true,
                isDescSame: true,
            };
        },
        computed: {
            isClickable() {
                return this.isDisabled || this.words.length === 0;
            },
            sortedGrams() {
                return this.grams.slice().sort();
            },
            isDescChanged() {
                return this.plainDesc.length === 0 || this.isDescSame;
            },

        },
        methods: {
            createKeywords(description) {
                this.isDescSame = true;
                this.filterArr = this.filterWords.split(',');
                this.filterArr = this.filterArr.map(word => word.toLowerCase());
                this.words = [];
                this.keywords = [];

                this.words = description.trim().toLowerCase().split(/[(\r\n|\r|\n)\s+\t]/g);
                this.words = this.words.filter(word => !this.filterArr.includes(word) && word !== '');


                for (let k = 1; k <= 10; k++) {
                    this.keywords[k] = new Set();

                    for (let i = 0; i <= this.words.length - k; i++) {
                        let keyword = '';

                        for (let j = 0; j < k; j++) {
                            keyword += this.words[i + j] + ' ';
                        }
                        this.keywords[k].add(keyword);
                        keyword = '';
                    }
                }
            },
            saveInput() {
                this.createKeywords(cleanDescription(this.plainDesc));
            },

        },
        watch: {
            plainDesc() {
                this.isDisabled = false;
                this.isDescSame = false;
            },
            filterWords() {

                this.isDisabled = false;
            },
            words() {
                this.isDisabled = true;
                this.isDescSame = true;
            },
        },

    };
</script>
