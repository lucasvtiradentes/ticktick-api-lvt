const request = require('request').defaults({ jar: true }); // Habilita cookies
const jar = request.jar(); // Cria uma jarra de cookies

async login(): Promise<boolean> {
  try {
    const url = `${this.configs.apiUrl}/${API_ROUTES.login}`;
    const data = {
      username: this.configs.username,
      password: this.configs.password
    };
    const options = getRequestOptions({ url, method: 'POST', payload: data, jar });

    return new Promise((resolve) => {
      this.configs.request(options, async (error, request, body) => {
        if (!body || body.errorMessage) {
          console.error(`login error: ${body ? body.errorMessage : 'Probably timeout.'}`);
          resolve(false);
        } else {
          // Os cookies agora estão salvos no jar e serão enviados automaticamente em solicitações futuras
          await this.getInboxProperties()
            .then((data) => {
              resolve(true);
            })
            .catch((err) => {
              resolve(false);
            });
        }
      });
    });
  } catch (e) {
    return false;
  }
}
