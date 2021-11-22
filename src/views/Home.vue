<template>
  <v-app id="inspire">
    

    <v-app-bar
      app
      clipped-right
      color="black"
      dark
      dense
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>BASF | Code Challenge</v-toolbar-title>
      <v-spacer />
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      dark
      color="orange"
    >
      <v-list dense id="drawer-list">
        <v-list-item>
            <v-list-item-content>
              <v-list-item-title><img style="width: 100%" :src="require(`@/assets/BASF-Logo_bw.svg.png`)" /></v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <div v-for="(item, index) in nav" :key="index">
        <v-list-item @click="cleartemp" v-if="!item.hasChild" :to="item.url" v-bind:class="{ active: item.url == $route.path ? 'v-item--active' : '' }">
          <v-list-item-action>
            <v-icon small>{{item.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{item.name}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
<v-divider></v-divider>
<div v-if="item.hasChild">
        <v-list-group
        :group="item.url"
        color="white"
        active-class="parent-color"
        no-action>
        <template v-slot:activator>
          <v-list-item-action>
            <v-icon small>{{item.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{item.name}}</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-divider></v-divider>
        <v-list-item @click="cleartemp" v-for="(child, idx) in item.children" :key="idx" :to="child.url" v-bind:class="{ active: child.url == $route.path ? 'v-item--active' : '' }">
          <v-list-item-action>
            <v-icon x-small>{{child.icon}}</v-icon>
          </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{child.name}}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
      </v-list-group>
</div>
<v-divider></v-divider>
      </div>
      </v-list>
    </v-navigation-drawer>

      <v-container fluid>
        <v-row
          justify="center"
          align="center"
        >
          <v-col cols="12">
            <transition name="slide" mode="out-in">
            <router-view :key="componentKey"  />
            </transition>
          </v-col>
        </v-row>
      </v-container>

    

    <v-footer
      app
      color="black"
      class="white--text"
    >
      <span class="caption">Copyright 2021</span>
      <v-spacer />
    </v-footer>
  </v-app>
</template>

<script>
import nav from '@/nav/nav'

  export default {
    name: 'Home',
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      nav: nav.items,
      componentKey: 0
    }),

    methods: {
      cleartemp(){
        this.componentKey += 1;  
      },
    }
  }
</script>

<style lang="scss">
/*
#drawer-list.v-list .v-list-item--active{
  background-color: #4C566B !important;
  //opacity: .24;
}
*/

.v-list-group .v-list-group__header .v-list-item__icon.v-list-group__header__append-icon{
  i{
    font-size: 10px;
  }
}

#drawer-list .v-list-group.v-list-group--active.corporate-color {
    background-color: rgb(230, 231, 233) !important;
    color: #ADABB0 !important;
}

#drawer-list .v-list-group.v-list-group--active.driver-color {
    background-color: rgb(230, 231, 233) !important;
    color: #FBCE07 !important;
}

#drawer-list .v-list-group.v-list-group--active.operator-color {
    background-color: rgb(230, 231, 233) !important;
    color: #427AB3 !important;
}

.v-application--is-ltr .v-list-group--sub-group .v-list-group__items .v-list-item{
  padding-left: 40px !important;
}

.v-application--is-ltr .v-list--dense .v-list-group--sub-group .v-list-group__header{
  padding-left: 32px !important;
}

.non-subgroup-child-icon{
  margin-right: 12px !important;
  margin-left: 22px !important;
}

/*
.fade-enter-active,
.fade-leave-active{
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to{
  opacity: 0;
}
*/

.slide-enter-active,
.slide-leave-active{
  transition: opacity 0.25s, transform 0.25s;
}

.slide-enter,
.slide-leave-to{
  opacity: 0;
  transform: translate(-15%);
}

#main-table td, #main-table th{
    //white-space: nowrap;
    border: .5px solid #dddddd;
}

#main-table th{
    white-space: nowrap;
}

.v-data-table th {
  font-size: 11px;
}

.v-data-table td {
  font-size: 11px;
}

#profile-group-head .v-list-group__header__append-icon{
  min-width: 5px;
}
</style>