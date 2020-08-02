let div_body=document.createElement('div');
 div_body.classList.add('teams');
 document.body.append(div_body);
 let team_number=1;
 const c=59;
 let balls=1;
 let hit_button_flag=0;
 let score_check=0;
 let gen_res_button=document.getElementById('generate-results');
 let wickets=0;
 // Teams and Their Players.
 const team_json={
    "India":["M.S Dhoni","V.Kohli","S.Dhawan","A.Rahane","R.Sharma","S.Raina","A.Rayudu","R.Jadeja","S.Binny","R.Pant"],
    "Australia":["M.Clarke","G.Bailey","P.Cummins","X.Doherty","A.Finch","B.Haddin","J.Hazlewood","M.Johnson","S.Smith","B.Lee"]
 }
 
 class Teams{
     team_name;
     player_names=[]
     player_details=[];
     overall_runs=0;
     overall_balls=0;
     wicket_down=0;
    constructor(name){
        this.team_name=name;
        let div_team=document.createElement('div');
        div_body.appendChild(div_team);
        let name_tag=document.createElement('h4');
        name_tag.classList.add('team-name');
        div_team.append(name_tag);
        (<HTMLHeadingElement>name_tag).textContent=`${name}`;
        //Table==>table,thead,tbody
        let table=document.createElement('table');
        (<HTMLTableElement>table).id=`table${team_number}`;
        div_team.appendChild(table);
        table.classList.add('table','table-bordered','tables');
        let thead=document.createElement('thead');
        table.appendChild(thead);
        let tr,th_playerName,th_balls=[],th_total;
        tr=document.createElement('tr');
        thead.appendChild(tr);
        th_playerName=document.createElement('th');
        th_playerName.scope="col";
        th_playerName.innerText="Player Name";
        thead.appendChild(th_playerName);
        for(let i=0;i<=5;i++)
        {
            th_balls[i]=document.createElement('th');
            
            th_balls[i].innerText=`Ball ${i+1}`;
            thead.appendChild(th_balls[i]);
        }
        th_total=document.createElement('th');
        th_total.scope="col";
        th_total.innerText="Total";
        thead.appendChild(th_total);
        //tbody for players
        let tbody=document.createElement('tbody');
        table.appendChild(tbody);
        for(let i=0;i<=9;i++){
            //Name
            let row=document.createElement('tr');
            let td=document.createElement('td');
            let player_name=`${team_json[name][i]}`;
            (<HTMLTableDataCellElement>td).innerText=player_name;
            this.player_names.push(player_name);
            row.appendChild(td);
            tbody.appendChild(row);
            // runs scored in each ball
            for(let j=0;j<=6;j++)
            {
                let player_ballPlayed=document.createElement('td');
                
                row.appendChild(player_ballPlayed);

            }

        }
        //button for hit
        let btn=document.createElement('button') as HTMLButtonElement;
        btn.classList.add('btn','btn-success','hit-button');
        (<HTMLButtonElement>btn).id=team_number.toString();
        (<HTMLButtonElement>btn).addEventListener("click",event=>{
            this.timer((<HTMLButtonElement>btn).id);  
                
        });

        //Button for Display

        

        
        (<HTMLButtonElement>btn).innerText="Hit";
       
        div_team.appendChild(btn);
        
        team_number++;
        


    }
    timer(id):any{
        wickets=0;
        balls=1;
        let total_runs_individual;
        let table=document.getElementById(`table${id}`);
        let ball_number=0;
        let temp_runs=[],counter=0;
        console.log((<HTMLTableElement>table).rows[counter+1].cells[0]);
        let temp=c;
        let btn=document.getElementById(id);
        //Scoreboard
        let t=document.getElementById('scoreboard-timer')
        let scoreboard_table=document.getElementById('scoreboard');
        //
        let a=setInterval(()=>{
        (<HTMLHeadingElement>t).textContent=`${temp}`;
        let runScored=Math.floor((Math.random() * 6) + 0);
        console.log("Ball No",balls,"Run Scored",runScored,"Player No ",counter);//Comment THis later
        (<HTMLTableElement>scoreboard_table).rows[1].cells[2].innerText=`${over_calculate(balls)}`;
        this.overall_runs+=runScored;
        (<HTMLTableElement>scoreboard_table).rows[1].cells[1].innerText=`${this.overall_runs}/${wickets}`;
        (<HTMLTableElement>scoreboard_table).rows[1].cells[0].innerText=`${this.team_name}`;
        
        if(runScored==0){
            ++wickets;
            (<HTMLTableElement>table).rows[counter+1].cells[ball_number+1].innerText=`${runScored}`;
            temp_runs.push(runScored);
            this.player_details.splice(counter,0,temp_runs);
            ball_number=0;
            total_runs_individual=temp_runs.reduce((acc,curr)=>{
                return acc+curr;
            });
            (<HTMLTableElement>table).rows[counter+1].cells[7].innerText=`${total_runs_individual}`;
            total_runs_individual=0;
            temp_runs=[];
            counter++;
        }
        else{
            if(runScored==5){
                runScored+=1;
                this.overall_runs+=1;
            }
            temp_runs.push(runScored);
            //For 5
            
            
            (<HTMLTableElement>table).rows[counter+1].cells[ball_number+1].innerText=`${runScored}`;
            ++ball_number;
            if(ball_number>5){
                
                total_runs_individual=temp_runs.reduce((acc,curr)=>{
                    return acc+curr;
                });
                (<HTMLTableElement>table).rows[counter+1].cells[7].innerText=`${total_runs_individual}`;
                this.player_details.splice(counter,0,temp_runs);
                ball_number=0;
                ++wickets;
                total_runs_individual=0;
                temp_runs=[];
                counter++;
            }
            
        }
        if(temp==0||counter==10){
            wickets++;//remove this
            if(hit_button_flag==0){
                hit_button_flag++;
                score_check=this.overall_runs;

                this.wicket_down=wickets;
            }
            
            clearInterval(a);
            this.overall_balls=balls;
            this.wicket_down=wickets;
            (<HTMLButtonElement>btn).disabled=true;
            if(hit_button_flag==1){
                (<HTMLButtonElement>gen_res_button).disabled=false;
            }
    
        }
        if(hit_button_flag==1){
            
            if(this.overall_runs>score_check){
                clearInterval(a);
                total_runs_individual=temp_runs.reduce((acc,curr)=>{
                    return acc+curr;
                });
                (<HTMLTableElement>table).rows[counter+1].cells[7].innerText=`${total_runs_individual}`;
                this.player_details.splice(counter,0,temp_runs);
                this.wicket_down=wickets;
                this.overall_balls=balls;
                (<HTMLButtonElement>btn).disabled=true;
                (<HTMLButtonElement>gen_res_button).disabled=false;

            }
        }
        temp--;balls++;
        },1000)
         
    }
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
    disp_scores(){
        let team_stats={
            name:this.team_name,
            runs_scored_by_each:this.player_details,
            total_runs:this.overall_runs,
            total_balls:this.overall_balls,
            players_names:this.player_names
        }
        return team_stats;
    }
    

}
function load(){
    let team1=new Teams("India");
    let team2=new Teams("Australia");
    
    (<HTMLButtonElement>document.getElementById("load")).disabled=true;
    let max1=0,max_idx1=0,max2=0,max_idx2=0;
    let p=document.getElementById('to-display-results');
    (<HTMLButtonElement>gen_res_button).addEventListener("click",event=>{
        (<HTMLButtonElement>document.getElementById("again")).disabled=false;
        let team_one_stats=team1.disp_scores();
        let team_two_stats=team2.disp_scores();
        console.log(team_one_stats);
        console.log(team_two_stats);
        if(team_one_stats.total_runs>team_two_stats.total_runs){
            p.innerHTML=`<b>Winner :</b>${team_one_stats.name}<br/><b>Won By:</b>${team_one_stats.total_runs-team_two_stats.total_runs} Runs<br/>`;
        }else if(team_two_stats.total_runs>team_one_stats.total_runs){
            p.innerHTML=`<b>Winner :</b>${team_two_stats.name}<br/><b>Won By:</b>${team_two_stats.total_runs-team_one_stats.total_runs} Runs<br/>`;
        }else if(team_two_stats.total_runs==team_one_stats.total_runs){
            p.innerHTML=`Draw<br/>`;
        }
        //Man Of the Match
        //Team 1
        team_one_stats.runs_scored_by_each.map((player,idx)=>{
            let b=player.reduce((acc,curr)=>{
                return acc+curr;
            })
            if(b>max1){
                max1=b;
                max_idx1=idx;}
        })
        //Team 2
        team_two_stats.runs_scored_by_each.map((player,idx)=>{
            let b=player.reduce((acc,curr)=>{
                return acc+curr;
            })
            if(b>max2){
                max2=b;
                max_idx2=idx;}
        })
        
        if(max1>max2){
            p.innerHTML+=`<b>Man of The Match :</b>${team_one_stats.players_names[max_idx1]}&nbsp;Runs Scored:${max1}<br/>`;
        }else{
            p.innerHTML+=`<b>Man of The Match :</b>${team_two_stats.players_names[max_idx2]}&nbsp;Runs Scored:${max2}<br/>`;
        }
        //Team Statistics

        let avg1,avg2;
        avg1=((team_one_stats.total_runs)/+(over_calculate(team_one_stats.total_balls))).toFixed(1);
        avg2=((team_two_stats.total_runs)/+(over_calculate(team_two_stats.total_balls))).toFixed(1);
        p.innerHTML+=`<b>Individual Team Statistics</b><br/>Team :${team_one_stats.name} &nbsp;Batting Average:${avg1}<br/>`;
        p.innerHTML+=`Team :${team_two_stats.name}&nbsp;Batting Average:${avg2}`;
    })
}

function over_calculate(b){
    if(b%6==0){
        return (b/6).toFixed(1);
    }else {
        let t=Math.floor(b/6);
        return t+(b%6)/10;
    }

}

function refresh(){
    window.location.reload();
}
