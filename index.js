var div_body = document.createElement('div');
div_body.classList.add('teams');
document.body.append(div_body);
var team_number = 1;
var c = 59;
var balls = 1;
var hit_button_flag = 0;
var score_check = 0;
var gen_res_button = document.getElementById('generate-results');
var wickets = 0;
// Teams and Their Players.
var team_json = {
    "India": ["M.S Dhoni", "V.Kohli", "S.Dhawan", "A.Rahane", "R.Sharma", "S.Raina", "A.Rayudu", "R.Jadeja", "S.Binny", "R.Pant"],
    "Australia": ["M.Clarke", "G.Bailey", "P.Cummins", "X.Doherty", "A.Finch", "B.Haddin", "J.Hazlewood", "M.Johnson", "S.Smith", "B.Lee"]
};
var Teams = /** @class */ (function () {
    function Teams(name) {
        var _this = this;
        this.player_names = [];
        this.player_details = [];
        this.overall_runs = 0;
        this.overall_balls = 0;
        this.wicket_down = 0;
        this.team_name = name;
        var div_team = document.createElement('div');
        div_body.appendChild(div_team);
        var name_tag = document.createElement('h4');
        name_tag.classList.add('team-name');
        div_team.append(name_tag);
        name_tag.textContent = "" + name;
        //Table==>table,thead,tbody
        var table = document.createElement('table');
        table.id = "table" + team_number;
        div_team.appendChild(table);
        table.classList.add('table', 'table-bordered', 'tables');
        var thead = document.createElement('thead');
        table.appendChild(thead);
        var tr, th_playerName, th_balls = [], th_total;
        tr = document.createElement('tr');
        thead.appendChild(tr);
        th_playerName = document.createElement('th');
        th_playerName.scope = "col";
        th_playerName.innerText = "Player Name";
        thead.appendChild(th_playerName);
        for (var i = 0; i <= 5; i++) {
            th_balls[i] = document.createElement('th');
            th_balls[i].innerText = "Ball " + (i + 1);
            thead.appendChild(th_balls[i]);
        }
        th_total = document.createElement('th');
        th_total.scope = "col";
        th_total.innerText = "Total";
        thead.appendChild(th_total);
        //tbody for players
        var tbody = document.createElement('tbody');
        table.appendChild(tbody);
        for (var i = 0; i <= 9; i++) {
            //Name
            var row = document.createElement('tr');
            var td = document.createElement('td');
            var player_name = "" + team_json[name][i];
            td.innerText = player_name;
            this.player_names.push(player_name);
            row.appendChild(td);
            tbody.appendChild(row);
            // runs scored in each ball
            for (var j = 0; j <= 6; j++) {
                var player_ballPlayed = document.createElement('td');
                row.appendChild(player_ballPlayed);
            }
        }
        //button for hit
        var btn = document.createElement('button');
        btn.classList.add('btn', 'btn-success', 'hit-button');
        btn.id = team_number.toString();
        btn.addEventListener("click", function (event) {
            _this.timer(btn.id);
        });
        //Button for Display
        btn.innerText = "Hit";
        div_team.appendChild(btn);
        team_number++;
    }
    Teams.prototype.timer = function (id) {
        var _this = this;
        wickets = 0;
        balls = 1;
        var total_runs_individual;
        var table = document.getElementById("table" + id);
        var ball_number = 0;
        var temp_runs = [], counter = 0;
        console.log(table.rows[counter + 1].cells[0]);
        var temp = c;
        var btn = document.getElementById(id);
        //Scoreboard
        var t = document.getElementById('scoreboard-timer');
        var scoreboard_table = document.getElementById('scoreboard');
        //
        var a = setInterval(function () {
            t.textContent = "" + temp;
            var runScored = Math.floor((Math.random() * 6) + 0);
            console.log("Ball No", balls, "Run Scored", runScored, "Player No ", counter); //Comment THis later
            scoreboard_table.rows[1].cells[2].innerText = "" + over_calculate(balls);
            _this.overall_runs += runScored;
            scoreboard_table.rows[1].cells[1].innerText = _this.overall_runs + "/" + wickets;
            scoreboard_table.rows[1].cells[0].innerText = "" + _this.team_name;
            if (runScored == 0) {
                ++wickets;
                table.rows[counter + 1].cells[ball_number + 1].innerText = "" + runScored;
                temp_runs.push(runScored);
                _this.player_details.splice(counter, 0, temp_runs);
                ball_number = 0;
                total_runs_individual = temp_runs.reduce(function (acc, curr) {
                    return acc + curr;
                });
                table.rows[counter + 1].cells[7].innerText = "" + total_runs_individual;
                total_runs_individual = 0;
                temp_runs = [];
                counter++;
            }
            else {
                if (runScored == 5) {
                    runScored += 1;
                    _this.overall_runs += 1;
                }
                temp_runs.push(runScored);
                //For 5
                table.rows[counter + 1].cells[ball_number + 1].innerText = "" + runScored;
                ++ball_number;
                if (ball_number > 5) {
                    total_runs_individual = temp_runs.reduce(function (acc, curr) {
                        return acc + curr;
                    });
                    table.rows[counter + 1].cells[7].innerText = "" + total_runs_individual;
                    _this.player_details.splice(counter, 0, temp_runs);
                    ball_number = 0;
                    ++wickets;
                    total_runs_individual = 0;
                    temp_runs = [];
                    counter++;
                }
            }
            if (temp == 0 || counter == 10) {
                wickets++; //remove this
                if (hit_button_flag == 0) {
                    hit_button_flag++;
                    score_check = _this.overall_runs;
                    _this.wicket_down = wickets;
                }
                clearInterval(a);
                _this.overall_balls = balls;
                _this.wicket_down = wickets;
                btn.disabled = true;
                if (hit_button_flag == 1) {
                    gen_res_button.disabled = false;
                }
            }
            if (hit_button_flag == 1) {
                if (_this.overall_runs > score_check) {
                    clearInterval(a);
                    total_runs_individual = temp_runs.reduce(function (acc, curr) {
                        return acc + curr;
                    });
                    table.rows[counter + 1].cells[7].innerText = "" + total_runs_individual;
                    _this.player_details.splice(counter, 0, temp_runs);
                    _this.wicket_down = wickets;
                    _this.overall_balls = balls;
                    btn.disabled = true;
                    gen_res_button.disabled = false;
                }
            }
            temp--;
            balls++;
        }, 1000);
    };
    /*    gen_runs():any{
            console.log("gen running");
            
           
                for(let i=0;i<=9;i++){
                    for(let j=0;j<=5;j++){
                        
                        if(runScored==0)
                          break;
                    }
                    this.player_details.push(temp_runs);
                }
            
        
        }*/
    Teams.prototype.disp_scores = function () {
        var team_stats = {
            name: this.team_name,
            runs_scored_by_each: this.player_details,
            total_runs: this.overall_runs,
            total_balls: this.overall_balls,
            players_names: this.player_names
        };
        return team_stats;
    };
    return Teams;
}());
function load() {
    var team1 = new Teams("India");
    var team2 = new Teams("Australia");
    document.getElementById("load").disabled = true;
    var max1 = 0, max_idx1 = 0, max2 = 0, max_idx2 = 0;
    var p = document.getElementById('to-display-results');
    gen_res_button.addEventListener("click", function (event) {
        document.getElementById("again").disabled = false;
        var team_one_stats = team1.disp_scores();
        var team_two_stats = team2.disp_scores();
        console.log(team_one_stats);
        console.log(team_two_stats);
        if (team_one_stats.total_runs > team_two_stats.total_runs) {
            p.innerHTML = "<b>Winner :</b>" + team_one_stats.name + "<br/><b>Won By:</b>" + (team_one_stats.total_runs - team_two_stats.total_runs) + " Runs<br/>";
        }
        else if (team_two_stats.total_runs > team_one_stats.total_runs) {
            p.innerHTML = "<b>Winner :</b>" + team_two_stats.name + "<br/><b>Won By:</b>" + (team_two_stats.total_runs - team_one_stats.total_runs) + " Runs<br/>";
        }
        else if (team_two_stats.total_runs == team_one_stats.total_runs) {
            p.innerHTML = "Draw<br/>";
        }
        //Man Of the Match
        //Team 1
        team_one_stats.runs_scored_by_each.map(function (player, idx) {
            var b = player.reduce(function (acc, curr) {
                return acc + curr;
            });
            if (b > max1) {
                max1 = b;
                max_idx1 = idx;
            }
        });
        //Team 2
        team_two_stats.runs_scored_by_each.map(function (player, idx) {
            var b = player.reduce(function (acc, curr) {
                return acc + curr;
            });
            if (b > max2) {
                max2 = b;
                max_idx2 = idx;
            }
        });
        if (max1 > max2) {
            p.innerHTML += "<b>Man of The Match :</b>" + team_one_stats.players_names[max_idx1] + "&nbsp;Runs Scored:" + max1 + "<br/>";
        }
        else {
            p.innerHTML += "<b>Man of The Match :</b>" + team_two_stats.players_names[max_idx2] + "&nbsp;Runs Scored:" + max2 + "<br/>";
        }
        //Team Statistics
        var avg1, avg2;
        avg1 = ((team_one_stats.total_runs) / +(over_calculate(team_one_stats.total_balls))).toFixed(1);
        avg2 = ((team_two_stats.total_runs) / +(over_calculate(team_two_stats.total_balls))).toFixed(1);
        p.innerHTML += "<b>Individual Team Statistics</b><br/>Team :" + team_one_stats.name + " &nbsp;Batting Average:" + avg1 + "<br/>";
        p.innerHTML += "Team :" + team_two_stats.name + "&nbsp;Batting Average:" + avg2;
    });
}
function over_calculate(b) {
    if (b % 6 == 0) {
        return (b / 6).toFixed(1);
    }
    else {
        var t = Math.floor(b / 6);
        return t + (b % 6) / 10;
    }
}
function refresh() {
    window.location.reload();
}
