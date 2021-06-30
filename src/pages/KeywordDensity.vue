
<template>
    <div class="w-screen sm:flex sm:justify-around">
        <div class="w-full sm:w-2/5">
            <el-input
                v-model="plainDesc"
                type="textarea"
                placeholder="Please enter your app description"
                autofocus
                rows="15"
            />
            <div class="flex justify-between items-center">
                <el-button
                    :disabled="isDescChanged" class="bg-red-500 text-white"
                    @click="saveInput"
                >
                    Count
                </el-button>
                <p>
                    Total Characters: <span class="font-bold text-lg">{{ countChar }}</span>
                </p>
            </div>
        </div>
        <div class="w-auto ma-table">
            <el-table
                :data="keywords"
                :row-class-name="tableRowClassName"
            >
                <el-table-column
                    prop="name"
                    label="Keyword"
                    width="360"
                />
                <el-table-column
                    prop="count"
                    label="Count"
                    width="90"
                />
                <el-table-column
                    prop="density"
                    label="Density"
                    width="90"
                />
                <div slot="empty">
                    <i class="el-icon-warning-outline">No Data</i>
                </div>
            </el-table>
            <el-button
                v-clipboard:copy="copyKeywords"
                class="bg-blue-500 text-white mt-5"
            >
                Copy To Clipboard
            </el-button>
        </div>
    </div>
</template>

<script>


    import { regex,splitRegex, filterArr } from '../cleanupResources';

    export default {

        data(){
            return {
                plainDesc: '',
                keywords: [],
                words: [],
                filteredWords: [],
                copyKeywords: '',
                isDescSame: true,
            };
        },
        computed: {
            isDescChanged(){
                return this.plainDesc.length === 0 || this.isDescSame;
            },
            countChar(){
                return this.plainDesc.length;
            },
        },

        methods: {
            /*eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }]*/
            tableRowClassName({ _, rowIndex }) {
                if (rowIndex % 2 === 0) {
                    return 'even-row';
                } else {
                    return 'odd-row';
                }
            },
            createKeywords(description) {
                this.isDescSame = true;

                this.words = [];
                this.keywords = [];

                this.words = description.trim().toLowerCase().split(/[(\r\n|\r|\n)\s+\t]/g);
                this.filteredWords = this.words.filter(word => !filterArr.includes(word) && word !== '');

                for (let i = 0; i < this.filteredWords.length; i++) {
                    let keyword = this.filteredWords[i];
                    let isExist = this.search(keyword, this.keywords);
                    if ( isExist == null){
                        this.keywords.push({
                            count: 1,
                            name: keyword,
                            density: 0,
                        });
                    } else {
                        this.keywords[isExist].count++;
                        this.keywords[isExist].density = (100 * this.keywords[isExist].count / this.words.length).toFixed(2);
                    }

                    keyword = '';
                }
                this.keywords = this.keywords.filter(function( obj ) {
                    return obj.count > 1;
                }).sort((a,b) => {
                    return b.count - a.count;
                }).reduce((a, i) => {
                    const f = a.find(f => f.count === i.count);
                    if (!f) {
                        a.push(i);
                    } else {
                        f.name += ',' + i.name;
                    }
                    return a;
                }, []);

                this.copyKeywords = this.keywords.map(e => e.name).join(',');

            },
            saveInput(){
                let description = '';
                description= this.plainDesc.replace(regex, '');
                description = description.replace(splitRegex, ' ');
                this.createKeywords(description);
            },
            search(nameKey, myArray){
                for (let i=0; i < myArray.length; i++) {
                    if (myArray[i].name === nameKey) {
                        return i;
                    }
                }
                return null;
            },

        },
        watch: {
            plainDesc(){
                this.isDescSame = false;
            },
            words(){
                this.isDescSame = true;
            },
        },

    };
</script>

<style scoped>

.ma-table {
.el-table>>> .odd-row {
  @apply bg-gray-200 text-black;
}
.el-table>>> .even-row {
  @apply bg-white text-black;
}

.el-table >>> th {
  @apply bg-blue-500 text-white;

}

}



</style>
