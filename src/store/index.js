import { createStore } from "vuex";
import { user } from '@/store/modules/user'
import { lang } from '@/store/modules/lang'

export default createStore({
  modules: { user, lang },
});
