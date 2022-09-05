import { createStore } from "vuex";
import { user } from '@/store/modules/user'
import { lang } from '@/store/modules/lang'
import { dictionary } from '@/store/modules/dictionary'
import { testing } from '@/store/modules/testing'



export default createStore({
  modules: { user, lang, dictionary, testing },
});
