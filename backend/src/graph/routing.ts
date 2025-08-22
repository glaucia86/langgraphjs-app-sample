import { EmailState } from "./state/EmailState";

export function routeEmail(state: EmailState): 'spam' | 'legitimate' {
  if (state.isSpam === true) {
    return 'spam';
  } else {
    return 'legitimate';
  }
}