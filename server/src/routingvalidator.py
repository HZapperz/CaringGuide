import azure.functions as func

class RoutingValidator:
    
    @staticmethod
    def check_valid_params(req: func.HttpRequest, params: list) -> bool:
        """
        Function to check if all params are in the request
        :param req: func.HttpRequest object from Azure
        :param params: list of params to check
        :return: True if all params are in the request, False otherwise
        """
        if not req:
            return False
        if not params:
            return False
        for param in params:
            if not req.params.get(param):
                return False
        return True

    @staticmethod
    def check_valid_body(req: func.HttpRequest, params: list) -> bool:
        """
        Function to check if all params are in the request body
        :param req: func.HttpRequest object from Azure
        :param req_body: dict of body params to check
        :return: True if all params are in the request, False otherwise
        """ 
        if not req:
            return False
        try:
            req_body = req.get_json()
        except ValueError:
            return False
        for param in params:
            if not req_body.get(param):
                return False
        return True