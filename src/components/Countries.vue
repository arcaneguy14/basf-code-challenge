<template>
    <div>
        <v-breadcrumbs :items="crumbs" divider="/" style="background-color: #f0f0f0">
        </v-breadcrumbs>
        <v-card class="mx-auto" outlined tile color="#F8F8FF">
        <v-card-title>Countries</v-card-title>
        <v-container fluid>
            <v-row>
                <v-btn-toggle class="col-12 offset-md-6 col-md-6" style="background: none">
                    <v-text-field placeholder="Search" class="search-textfield" hide-details dense v-model="search"></v-text-field>
                </v-btn-toggle>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn color="primary" small @click="clearAll">Clear All</v-btn>
                </v-col>
            </v-row>
            <v-row dense>
                <v-col cols="12" md="12" id="table-parent" class="mt-4">
                    <v-data-table
                        calculate-widths
                        :headers="headers"
                        :items="items"
                        :loading="tableloading"
                        loading-text= "Loading Data... Please wait"
                        :search="search"
                        id="main-table"
                        dense
                        sort-desc
                        item-key="row"
                    >
                    <template slot="item" slot-scope="props">
                        <tr>
                            <td><v-simple-checkbox v-model="props.item.checkbox"></v-simple-checkbox></td>
                            <td>{{props.item.row}}</td>
                            <td v-html="highlight(props.item.name)"></td>
                            <td v-html="highlight(props.item.region)"></td>
                            <td v-html="highlight(props.item.capital)"></td>
                            <td>
                                <img v-if="props.item.flag !== null" class="my-2" style="border: 1px solid #191716" width="120px" :src="props.item.flag" />
                                <span v-else>N/A</span>
                            </td>
                        </tr>
                    </template>
                    </v-data-table>
                </v-col>
            </v-row>
        </v-container>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'Countries',

    data(){
        return {
            crumbs: [
                {
                text: 'Home',
                disabled: true,
                href: '#',
                },

                {
                text: 'Countries',
                disabled: true,
                href: '#',
                }
            ],

            items: [],
            search: '',
            headers: [
                { text: '', value: 'checkbox', width: '3%' },
                { text: '#', value: 'row', width: '3%' },
                { text: 'Name', value: 'name', width: '5%' },
                { text: 'Region', value: 'region', width: '3%' },
                { text: 'Capital', value: 'capital', width: '3%' },
                { text: 'Flag', value: 'flag', width: '3%' }
            ],
            tableloading: false,
            totalrecords: '',
        }
    },

    async created(){
        await this.listAllItems();
        if (localStorage.getItem('selectedItems') !== null){
            let arr1 = this.items;
            let arr2 = JSON.parse(localStorage.getItem('selectedItems'));

            arr1.forEach(item1 => {
                var itemFromArr2 = arr2.find(item2 => item2.row == item1.row);

                if (itemFromArr2) {
                    item1.checkbox = itemFromArr2.checkbox;
                }
            }
            )
        }
        
        this.$watch(() => this.items, this.getCount, {deep: true});
    },

    methods: {
        async listAllItems(){
            this.items = [];

            try {
                this.tableloading = true;
                let response = await this.$store.dispatch("getCountries", {});
                const arr = [];
                if (response.status === 200){
                    this.totalrecords = response.data.length;
                    let dt = response.data;
                    dt.forEach((doc, i) => {
                        arr.push({
                            checkbox: false,
                            row: i + 1,
                            name: doc.name || 'N/A',
                            region: doc.region || 'N/A',
                            capital: doc.capital || 'N/A',
                            flag: doc.flag || 'N/A',
                            population: doc.population
                        });
                    });
                }
                this.items = arr;
                this.tableloading = false;
            } catch (error) {
                console.log(error);
            }
        },

        highlight(itm) {
            if(!this.search) {
                return itm;
            }
            return itm.replace(new RegExp(this.search, "gi"), match => {
                return '<span style="color: orange; font-weight: bold">' + match + '</span>';
            });
        },

        getCount(){
            let filtered = this.items.filter(i => i.checkbox == true);
            let mapFiltered = filtered.map(i => ({
                checkbox: i.checkbox,
                row: i.row,
                name: i.name,
                region: i.region,
                capital: i.capital,
                flag: i.flag,
                population: i.population
                }));

            if (filtered.length == false) {
                localStorage.removeItem('selectedItems');
                return false;
            }
            else {
                localStorage.setItem('selectedItems', JSON.stringify(mapFiltered));
            }
        },

        clearAll(){
            for(let [index, item] of this.items.entries()){
                item.checkbox = false;
            }
        },
    }
}
</script>