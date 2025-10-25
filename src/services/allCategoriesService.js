import api from "./axios";
/**
 * 🧠 دالة ذكية لجلب كل الكاتيجوريز (من غير باجنيشن فعلي)
 * - بتتعامل مع السيرفر سواء فيه صفحة واحدة أو أكتر
 * - تستخدم per_page كبير وتجمع كل النتائج لو موجودة
 */
export const getAllCategories = async () => {
    let all = [];
    let currentPage = 1;
    let lastPage = 1;
    try {
        do {
            const res = await api.get("/categories", {
                params: {
                    no_pagination: true, // نحاول الأول نلغي الباجنيشن
                    per_page: 100,       // لو الباجنيشن شغال هنخلي الحد كبير
                    page: currentPage,
                },
            });
            const data = res?.data?.data || [];
            const meta = res?.data?.meta || {};
            all = [...all, ...data];
            lastPage = meta.last_page || 1;
            currentPage++;
        } while (currentPage <= lastPage);
        console.log(`✅ Loaded ${all.length} categories total.`);
        return all;
    } catch (error) {
        console.error("❌ Error fetching all categories:", error);
        throw error;
    }
};
