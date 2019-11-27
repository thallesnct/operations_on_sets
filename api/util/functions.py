def remove_duplicates(set_list):
  filtered_set_list = []

  [filtered_set_list.append(el) for el in set_list if el not in filtered_set_list]

  return filtered_set_list

def transform_string_to_set(set_string):
    set_list = list(set_string)

    for index, char in enumerate(set_list):
        if (char == '{' or char == '('):
            set_list[index] = '['
        elif (char == '}' or char == ')'):
            set_list[index] = ']'
        elif (96 < ord(str(char)) < 123 and set_list[index - 1] != "'"):
            set_list[index] = '"' + char + '"'

    return remove_duplicates(eval("".join(set_list)))

def transform_set_list_to_string(set_list):
    set_list = list(str(set_list))

    set_list[0] = '{ ';
    set_list[len(set_list) - 1] = ' }';

    for index, char in enumerate(set_list):
        if (char == '['):
            set_list[index] = '('
        elif (char == ']'):
            set_list[index] = ')'

    return "".join(set_list)

def powerset(set_list):
    if len(set_list) <= 1:
        yield set_list
        yield []
    else:
        for item in powerset(set_list[1:]):
            yield [set_list[0]]+item
            yield item