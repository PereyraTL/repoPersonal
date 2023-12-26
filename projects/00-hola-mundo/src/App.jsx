import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard.jsx'

const users = [
    {
        userName: 'IbaiLlanos',
        name:'Ibai Llanos',
        isFollowing: false
    },
    {
        userName: 'RiverPlate',
        name:'River Plate',
        isFollowing: true
    },
    {
        userName: 'vxnder',
        name:'elonsito',
        isFollowing: false
    }

]


//la key deberia ser un id de la db pero aca le mandamos username anache
//estoy usando children
export function App (){
    //el estado interno no se propaga a los hijos (para abajo)
    return(
        <section className='App'>
            {
                users.map(user =>{
                    const{userName, name, isFollowing} = user
                    return(
                        <TwitterFollowCard
                            key={userName}
                            userName={userName}
                            initialIsFollowing={isFollowing}
                        >
                            {name}
                        </TwitterFollowCard>
                    )
                })
            }
            
        </section>
    )
}