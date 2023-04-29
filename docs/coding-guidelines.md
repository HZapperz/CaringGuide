Documentation:
- Files should have documentation on what the file accomplishes, and basic usage/general information
- Better inline and function documentation
  - We should have function documentation for every function
  - Refer to [PEP 257](https://peps.python.org/pep-0257/) for Python
    ```py
    @staticmethod
    def negation_tagger(sentences: list) -> list:
        """Returns negation tagged tokens in a sentence 

        :param sentences: the premise or hypothesis
        :type sentences: list
        :rtype: list
        :return: "_NEG" appended for tokens within negation's scope
        """
        return [mark_negation(sent) for sent in sentences]

    @staticmethod
    def bool_negation_tagger(sentences: list) -> list:
        """Returns negation tagged sentences

        :param list sentences: the premise or hypothesis
        :type sentences: list
        :rtype: list
        :return: True for sentences that contain negation, otherwise False
        """
        return [negated(sent) for sent in sentences]
    ```

Code guidelines:
- Common code styling guidelines
  - Refer to [PEP 8](https://peps.python.org/pep-0008/) for Python
  - Classes/class names should all be PascalCase, variable names should be snake_case across our stack
- Be as verbose as possible with our variables
- Inherent readability without comments
- Examples:
  - boolean functions and variables should be something like is_item_exists
  - Integer functions and variables should be something like num_items
- Abstract as much as possible for code cleanliness and readability
  - Split up as much as possible into different functions
  - Split common code into libraries, focus on code reusability and optimization
- Add typing and type hinting to our code (Python especially)
  - Catch more errors
  - Better inherent readability
  - Easier to maintain
- Move constants out of file or on the top of files
  - Topic data for example can be moved out of the file
  - Helps with readability and explaining magic numbers