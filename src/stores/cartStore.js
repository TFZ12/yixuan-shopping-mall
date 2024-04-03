import { defineStore } from "pinia";
import { ref, computed } from 'vue'
import { useUserStore } from "./use";
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'


export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)

    const cartList = ref([])

    const updateNewList = async () => {
        const res = await findNewCartListAPI()
        cartList.value = res.result
    }


    const addCart = async (goods) => {
        const { skuId, count } = goods
        if (isLogin.value) {
            await insertCartAPI({ skuId, count })
            updateNewList()
        } else {
            const item = cartList.value.find((item) => item.skuId === goods.skuId)
            if (item) {
                item.count++
            } else {
                cartList.value.push(goods)
            }
        }

    }

    const delCart = async (skuId) => {
        if (isLogin.value) {
            await delCartAPI([skuId])
            updateNewList()
        } else {
            const idx = cartList.value.findIndex(item => skuId === item.skuId)
            cartList.value.splice(idx, 1)
            // cartList.value = cartList.value.filter(item => item.skuId != skuid)
        }

    }

    const clearCart = () => {
        cartList.value = []
    }

    const singleCheck = (skuId, selected) => {
        const item = cartList.value.find(item => item.skuId === skuId)
        item.Selection = selected
    }

    const allCheck = (selected) => {
        cartList.value.forEach(item => item.Selection = selected)
    }

    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))

    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))

    const selectedCount = computed(() => cartList.value.filter(item => item.Selection).reduce((a, c) => a + c.count, 0))

    const selectedPrice = computed(() => cartList.value.filter(item => item.Selection).reduce((a, c) => a + c.count * c.price, 0))

    const isAll = computed(() => cartList.value.every(item => item.Selection))

    return {
        cartList,
        allCount,
        allPrice,
        isAll,
        selectedCount,
        selectedPrice,
        addCart,
        delCart,
        singleCheck,
        allCheck,
        clearCart,
        updateNewList
    }
}, {
    persist: true
})