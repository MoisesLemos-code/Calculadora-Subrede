import Vue from 'vue'
import VueRouter from 'vue-router'

import Menu from '../views/Menu';
import DivisaoPorQtdSubrede from '../views/DivisaoPorQtdSubrede';
import DivisaoPorQtdHost from '../views/DivisaoPorQtdHost';
import DescobrirDivisaoSubrede from '../views/DescobrirDivisaoSubrede';

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Menu },
  { path: '/DivisaoPorQtdSubrede', component: DivisaoPorQtdSubrede },
  { path: '/DivisaoPorQtdHost', component: DivisaoPorQtdHost },
  { path: '/DescobrirDivisaoSubrede', component: DescobrirDivisaoSubrede }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
