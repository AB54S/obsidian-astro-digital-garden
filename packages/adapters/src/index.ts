export interface CommentsAdapter {
  render(): string;
}

export class GiscusAdapter implements CommentsAdapter {
  constructor(private config: any) {}

  render(): string {
    return `<!-- Giscus Comment Placeholder -->`;
  }
}

export interface SubscriptionAdapter {
  renderForm(): string;
}

export class EmailAdapter implements SubscriptionAdapter {
  renderForm(): string {
    return `<form><!-- Email Signup Placeholder --></form>`;
  }
}

