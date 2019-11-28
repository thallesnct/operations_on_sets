import util.functions as functions
from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route("/format_set", methods=['POST'])
def format_set():
    data = request.get_json()

    formatted_set_list = functions.transform_string_to_set(data["set"])

    formatted_set_list_as_string = functions.transform_set_list_to_string(formatted_set_list)

    return jsonify({ 'result': formatted_set_list_as_string, 'result_as_list': str(formatted_set_list), 'result_cardinality': len(formatted_set_list)})

@app.route("/calculate", methods=['POST'])
def calculate():
    data = request.get_json()
    
    set_expression = data["set"]

    print(set_expression)

    result = None
    result_as_string = None
    if (set_expression.__contains__(" U ")):
        [first, second] = set_expression.split(" U ")
        [first, second] = [functions.transform_string_to_set(first), functions.transform_string_to_set(second)]
        result = functions.remove_duplicates(first + second)
        result_as_string = functions.transform_set_list_to_string(result)
    elif (set_expression.__contains__(" ∩ ")):
        [first, second] = set_expression.split(" ∩ ")
        [first, second] = [functions.transform_string_to_set(first), functions.transform_string_to_set(second)]
        result = []
        [result.append(el) for el in first if el in second]
        result_as_string = functions.transform_set_list_to_string(result)
    elif (set_expression.__contains__(" - ")):
        [first, second] = set_expression.split(" - ")
        [first, second] = [functions.transform_string_to_set(first), functions.transform_string_to_set(second)]
        result = []
        [result.append(el) for el in first if el not in second]
        result_as_string = functions.transform_set_list_to_string(result)
    elif (set_expression.__contains__("P(")):
        set_list = functions.transform_string_to_set(set_expression[2:-1])
        print(set_list)
        result = [el for el in functions.powerset(set_list)]
        print(result)
        result_as_string = functions.transform_set_list_to_string(result)
    elif (set_expression.__contains__(" X ")):
        [first, second] = set_expression.split(" X ")
        [first, second] = [functions.transform_string_to_set(first), functions.transform_string_to_set(second)]
        result = []
        for el_f in first:
            for el_s in second:
                result.append((el_f, el_s))
        result_as_string = functions.transform_set_list_to_string(result)



    return jsonify({ 'result': result_as_string, 'result_as_list': str(result), 'result_cardinality': len(result) })
