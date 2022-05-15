export default function config(router: any) {
  if (localStorage.getItem("accessToken")) {
    router.urlService.rules.otherwise({ state: "home" });
  } else {
    // login or register
    router.urlService.rules.otherwise({ state: "login" });
  }
}
