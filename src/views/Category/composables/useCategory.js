import { getCategoryAPI } from '@/apis/category';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { onBeforeRouteUpdate } from 'vue-router';

export const useCategory = () => {
    const route = useRoute()
    const categoryData = ref({})
    const getCategory = async (id = route.params.id) => {
        const res = await getCategoryAPI(id)
        categoryData.value = res.result
    }

    onMounted(() => getCategory())

    onBeforeRouteUpdate((to) => {
        getCategory(to.params.id)
    })

    return {
        categoryData,
    }
}