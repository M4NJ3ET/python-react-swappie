// @app.delete("/api/delete-account/{unique_id}")
// def delete_account(unique_id: int, db: Session = Depends(get_db)):

//     # 1. Delete matches related to user
//     db.query(SwappieMatch).filter(
//         (SwappieMatch.user1_unique_id == unique_id) |
//         (SwappieMatch.user2_unique_id == unique_id)
//     ).delete(synchronize_session=False)

//     # 2. Delete swappie profile
//     db.query(SwappieUser).filter(
//         SwappieUser.unique_id == unique_id
//     ).delete(synchronize_session=False)

//     # 3. Delete main user
//     user = db.query(User).filter(User.unique_id == unique_id).first()
//     if not user:
//         raise HTTPException(status_code=404, detail="User not found")

//     db.delete(user)

//     db.commit()

//     return {"message": "Account deleted successfully"}
