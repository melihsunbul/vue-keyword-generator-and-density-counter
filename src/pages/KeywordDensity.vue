<template>
    <div class="w-screen font-hind-vadodara">
        <div class="text-center text-white mb-20 bg-header-bg p-10">
            <h1 class="mb-10">
                Keyword Density Counter
            </h1>
            <h3 class="font-normal">
                Quickly count how many times a keyword is repeated in your app’s long description.
            </h3>
        </div>
        <div class="bg-gray-100 flex items-center justify-center mb-10 p-10">
            <h3 class="font-normal w-3/4">
                Maintaining a good keyword density for your most relevant keywords in your app’s long description is good ASO practice, especially when optimizing your app to rank in the Google Play Store. Use this Keyword Density Counter to review the density on your top keywords.
            </h3>
        </div>
        <div class="w-screen sm:flex sm:justify-around">
            <div class="w-screen sm:w-2/5">
                <el-input
                    v-model="plainDesc"
                    type="textarea"
                    placeholder="Please enter your app description"
                    autofocus
                    rows="15"
                />
                <div class="flex justify-around items-center">
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
                    class="bg-white text-blue-500 mt-5"
                >
                    Copy To Clipboard
                </el-button>
            </div>
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

            tableRowClassName({ rowIndex }) {
                return rowIndex % 2 ? 'row-odd' : 'row-even';
            },
            createKeywords(description) {
                this.isDescSame = true;
                this.words = [];
                this.keywords = [];
                this.words = description.split(/[(\r\n|\r|\n)\s+\t]/g);
                this.filteredWords = this.words.filter(word => !filterArr.includes(word) && word !== '' && word !== ' ');
                for (let i = 0; i < this.filteredWords.length; i++) {
                    let keyword = this.filteredWords[i];
                    let isExist =  this.keywords.findIndex(kw => kw.name === keyword);
                    if (isExist === -1) {
                        this.keywords.push({
                            count: 1,
                            name: keyword,
                            density: 0,
                        });
                    } else {
                        this.keywords[isExist].count++;
                    }
                    keyword = '';
                }
                this.keywords = this.keywords.filter(kw => kw.count > 1).sort((a,b) => {
                    return b.count - a.count;
                }).reduce((acc, kwObject) => {
                    const f = acc.find(f => f.count === kwObject.count); //search keywords which have same count value with others
                    if (!f) {
                        acc.push(kwObject);
                    } else {
                        f.name += ',' + kwObject.name; //if there is a match concatenate name property in one object
                    }
                    return acc;
                }, []);
                this.keywords.forEach((kw, index, array) => {
                    array[index].density = '%' + (100 * array[index].count / this.words.length).toFixed(2);
                });
                this.copyKeywords = this.keywords.map(e => e.name).join(',');
            },
            saveInput(){
                const description = this.plainDesc.replace(regex, '').replace(splitRegex, ' ').trim().replaceAll('İ', 'i').toLowerCase();
                this.createKeywords(description);
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
  .el-table ::v-deep(.row-odd) {
    @apply bg-gray-200 text-black;
  }
  .el-table ::v-deep(.row-even) {
    @apply bg-white text-black;
  }

  .el-table ::v-deep th {
    @apply bg-blue-500 text-white;
  }
}
</style>
