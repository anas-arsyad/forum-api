const AddedThread = require("../AddedThread")


describe('a AddedThread entieties',()=>{
    it('should throw error when payload  did not match  needed propery',()=>{
        const payload ={
            id:'thread-ajsldaisdm',            
            userId:'user-alnsasd',
            // title:'testing title',
        }

        expect(()=>new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY')
    })

    it('should throw error when payload did not match data spesification',()=>{
        const payload ={
            id:'thread-ajsldaisdm',            
            userId:'user-alnsasd',
            title:{},
            // body:765
        }
        expect(()=>new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION')
    })

    it('should create registeredUser object correctly',()=>{
        const payload={
            id:'thread-ajsldaisdm',            
            userId:'user-alnsasd',
            title:'dasdsd',
            // body:'asdasd'
        }

        let addedThread= new AddedThread(payload)

        expect(addedThread.id).toEqual(payload.id)
        expect(addedThread.userId).toEqual(payload.userId)
        expect(addedThread.title).toEqual(payload.title)
        // expect(addedThread.body).toEqual(payload.body)
    })
})