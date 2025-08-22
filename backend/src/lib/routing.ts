import { EmailState } from "../graph/state/EmailState";

export function routeEmail(state: EmailState): 'spam' | 'legitimate' {
  if (state.isSpam === true) {
    return 'spam';
  } else {
    return 'legitimate';
  }
}