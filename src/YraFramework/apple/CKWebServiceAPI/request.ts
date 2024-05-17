import https from "https"
import {SignService} from "./sign.ts";

export class RequestService {
    readonly #hostname = "api.apple-cloudkit.com";
    readonly #port = 443;

    constructor(protected readonly signService: SignService) { }

    public makeRequest(requestPath: string, payload: any) {

        let payloadString = JSON.stringify(payload)

        const { dateString, signature } = this.signService.signRequest(payloadString, requestPath)

        const requestOptions = {
            hostname: this.#hostname,
            port: this.#port,
            path: requestPath,
            method: "POST",
            headers: {
                "X-Apple-CloudKit-Request-KeyID": this.signService.getKeyId(),
                "X-Apple-CloudKit-Request-ISO8601Date": dateString,
                "X-Apple-CloudKit-Request-SignatureV1": signature
            }
        }

        return new Promise((resolve, reject) => {
            const request = https.request(requestOptions, function(response) {
                let responseBody = ""

                response.on("data", function(chunk) {
                    responseBody += chunk.toString("utf8")
                })

                response.on("end", function() {
                    resolve(JSON.parse(responseBody))
                })
            })

            request.on("error", function(err) {
                reject(err)
            })

            request.end(payloadString)
        })
    }
}