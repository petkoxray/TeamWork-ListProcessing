(function () {
    let arr = [];
    let initialized = false;
    let finished = false;
    let index;
    let terminal = $('#terminal');
    let input = $('#console');
    $('#submit').click(submit);

    input.keypress(
        function (e) {
            if (e.which === 13) {
                submit();
            }
        });

    function submit() {
        let commandToken = input.val().split(' ').filter(e => e !== '');
        if (initialized) {
            switch (commandToken[0]) {
                case 'append' :
                    print(append());
                    break;
                case 'prepend' :
                    print(prepend());
                    break;
                case 'delete' :
                    print(deleteElement());
                    break;
                case 'count' :
                    print(count());
                    break;
                case 'end' :
                    print(end());
                    break;
                case 'reverse' :
                    print(reverse());
                    break;
                case 'sort':
                    print(sort());
                    break;
                case 'roll':
                    print(roll());
                    break;
                case 'insert' :
                    print(insert());
                    break;
                default:
                    print("Error: invalid command");
            }
        }
        if (!initialized) {
            arr = commandToken.slice(0);
            initialized = true;
            finished = false;
            print(arr.join(' '));
        }
        if (finished) {
            arr = [];
            initialized = false;
        }

        input.val('');

        function print(msg) {
            let output = terminal.val() + msg + '\n';
            terminal.val(output);
        }

        function append() {
            if (commandToken.length !== 2) {
                return "Error: invalid command parameters";
            }
            arr.push(commandToken[1]);
            return arr.join(' ');
        }

        function prepend() {
            if (commandToken.length !== 2) {
                return "Error: invalid command parameters";
            }
            arr.unshift(commandToken[1]);
            return arr.join(' ');
        }

        function deleteElement() {
            index = Number(commandToken[1]);
            if (index < 0 || index > arr.length - 1) {
                return `Error: invalid index ${index}`;
            }
            if (commandToken.length !== 2 || !Number.isInteger(index)) {
                return "Error: invalid command parameter";
            }
            arr.splice(index, 1);
            return arr.join(' ');
        }

        function count() {
            if (commandToken.length !== 2) {
                return "Error: invalid command parameter";
            }

            return arr.filter(e => e === commandToken[1]).length;
        }

        function reverse() {
            if (commandToken.length !== 1) {
                return "Error: invalid command parameters";

            }
            arr = arr.reverse();
            return arr.join(' ');
        }

        function end() {
            if (commandToken.length !== 1) {
                return "Error: invalid command parameters";
            }
            finished = true;
            return "Finished";
        }

        function sort() {
            if (commandToken.length !== 1) {
                return "Error: invalid command parameters";
            }

            arr = arr.sort((a, b) => a.localeCompare(b));
            return arr.join(' ');
        }

        function roll() {
            if (commandToken.length !== 2 || (commandToken[1] !== 'right'
                    && commandToken[1] !== 'left')) {
                return "Error: invalid command parameters";
            }

            if (commandToken[1] === 'left') {
                arr.push(arr.shift());
                return arr.join(' ');
            }

            arr.unshift(arr.pop());
            return arr.join(' ');
        }

        function insert() {
            index = Number(commandToken[1]);

            if (index < 0 || index > arr.length - 1) {
                return `Error: invalid index ${index}`;
            }

            if (commandToken.length !== 3) {
                return "Error: invalid command parameter";
            }

            arr.splice(index, 0, commandToken[2]);
            return arr.join(' ');
        }
    }
})();
