import {useRouter} from "vue-router";
import {useToast} from "primevue/usetoast";
import {supabase} from "../assets/js/Supabase";
import {LocalStore} from "../assets/js/Local";

export function useAuth() {
  const router = useRouter();
  const toast = useToast();
  const store = window.api.store;

  const getUser = async () => {
    const {error, data: {user}} = await supabase.auth.getUser()
    return {error, user};
  }

  const toSignup = () => {
    router.push({name: 'signup'});
  }
  const toSignin = () => {
    router.push({name: 'signin'});
  }

  const signin = async (email, password, rememberMe) => {
    const {data: {user}, error} = await supabase.auth.signInWithPassword(
      {
        email: email,
        password: password,
      }
    )
    LocalStore.public.set('user', {id: user.id});
    // the main process will check for this value and decide whether to clean up or persist the session upon app exit
    LocalStore.public.set('rememberMe', rememberMe);

    if (error) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: error.message,
        life: 3000
      })
    } else {
      await router.push({name: 'home'});
    }

  }

  const signup = async (email, password, metadata) => {
    const {error} = await supabase.auth.signUp(
      {
        email: email,
        password: password,
        options: {
          data: {...metadata}
        }
      }
    )

    if (error) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: error.message,
        life: 3000
      })
    } else {
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Account created successfully',
        life: 3000
      })

      toSignin();
    }
  }

  const signout = async () => {
    await supabase.auth.signOut()
    store.public.delete('rememberMe');
    store.public.delete('user');
    await router.push({name: 'signin'});
  }

  return {getUser, toSignup, toSignin, signin, signup, signout}
}
