import azure.functions as func

app = func.FunctionApp()

@app.function_name(name="HttpTrigger1")
@app.route(route="default") # HTTP Trigger
def test_function(req: func.HttpRequest) -> func.HttpResponse:
    return func.HttpResponse("HttpTrigger1 function processed a request!!!")


@app.function_name(name="HttpTrigger2")
@app.route(route="name")
def test_function(req: func.HttpRequest) -> func.HttpResponse:

     name = req.params.get('name')
     if not name:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            name = req_body.get('name')

     if name:
        return func.HttpResponse(f"Hello, {name}. This HTTP-triggered function executed successfully.")
     else:
        return func.HttpResponse(
             "This HTTP-triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.",
             status_code=200
        )